import React from 'react';
import {Editor, Modifier, EditorState} from 'draft-js';
import {reverse} from '../util';

import './index.less';
import substitutes from './substitute';
import EditorStateChange from './EditorStateChange';
import checkBlocks from './checkBlocks';

class CustomEditor extends Editor {
    constructor(props) {
        super(props);
        this.history = '';

        this.onChange = this.onChange.bind(this);
        this.handleBeforeInput = this.handleBeforeInput.bind(this);
        this.handlePastedText = this.handlePastedText.bind(this);
    }

    onChange(editorState) {
        const diff = new EditorStateChange(this.props.editorState, editorState);
        if (diff.hasContentChanged()) {
            switch (editorState.getLastChangeType()) {
                case 'insert-characters':
                    // do nothing
                    break;
                case 'backspace-character':
                    this.history = this.history.slice(0, 1);
                    break;
                default:
                    this.history = '';
                    break;
            }

            if (!['undo', 'redo'].includes(diff.getLastChangeType())) {
                setTimeout(() => {
                    const newContent = checkBlocks(diff);
                    if (newContent !== this.props.editorState.getCurrentContent()) {
                        this.props.setEditorState(EditorState.push(
                            this.props.editorState,
                            newContent,
                            'change-block-type'
                        ));
                    }
                });
            }
        } else if (diff.hasSelectionChanged()) {
            this.history = '';
        }

        this.props.setEditorState(editorState);
    }

    handleBeforeInput(chars) {
        if (substitutes.hasPrefix(reverse(chars))) {
            const prefix = substitutes.findPrefixes(reverse(this.history + chars))[0];
            if (prefix) {
                const selection = this.props.editorState.getSelection();
                const length = prefix.key.length - chars.length;
                const replaceSelection = selection.set('anchorOffset', selection.getAnchorOffset() - length);
                const contentState = Modifier.replaceText(
                    this.props.editorState.getCurrentContent(),
                    replaceSelection,
                    prefix.value
                );

                this.history = this.history.slice(0, -length) + prefix.value;
                this.props.setEditorState(EditorState.push(
                    this.props.editorState,
                    contentState,
                    'insert-characters'
                ));
                return 'handled';
            }
        }

        this.history += chars;
        return 'not-handled';
    }

    handlePastedText(text) {
        let end = text.length;
        let result = '';
        while (end > 0) {
            const search = reverse(text.slice(Math.max(0, end - substitutes.length), end));
            const prefix = substitutes.findPrefixes(search)[0];
            if (prefix) {
                result += prefix.value;
                end -= prefix.key.length;
            } else {
                result += search.charAt(0);
                end -= 1;
            }
        }
        const contentState = Modifier.replaceText(
            this.props.editorState.getCurrentContent(),
            this.props.editorState.getSelection(),
            reverse(result)
        );
        this.props.setEditorState(EditorState.push(
            this.props.editorState,
            contentState,
            'insert-fragment'
        ));

        return 'handled';
    }

    render() {
        return (
            <div id="editor" onClick={() => this.editor.focus()}>
                <Editor
                    ref={(component) => { this.editor = component; }}
                    onChange={this.onChange}
                    editorState={this.props.editorState}
                    handleBeforeInput={this.handleBeforeInput}
                    handlePastedText={this.handlePastedText}
                />
            </div>
        );
    }
}

export default CustomEditor;
