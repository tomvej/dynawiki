import React from 'react';
import {Editor, Modifier, EditorState, ContentState} from 'draft-js';
import {reverse} from '../util';

import './index.less';
import {styleRegex, styleChars} from './constants';
import substitutes from './substitute';
import {EditorStateChange, ContentStateModifier} from './util';
import checkBlocks from './checkBlocks';
import inlineBlocks from './inlineBlocks';

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
                    let newContent = checkBlocks(diff);
                    if (diff.getLastChangeType() !== 'insert-characters') {
                        newContent = inlineBlocks(diff, newContent);
                    }
                    if (newContent !== this.props.editorState.getCurrentContent()) {
                        this.props.setEditorState(EditorState.push(
                            this.props.editorState,
                            newContent,
                            'change-block-type',
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
                    prefix.value,
                );

                this.history = this.history.slice(0, -length) + prefix.value;
                this.props.setEditorState(EditorState.push(
                    this.props.editorState,
                    contentState,
                    'insert-characters',
                ));
                return 'handled';
            }
        } else if (chars.match(styleRegex)) {
            const selection = this.props.editorState.getSelection();
            const result = chars.split('')
                .map((char, index) => [index, styleChars[char]])
                .filter(([, style]) => !!style)
                .reduce((contentState, [index, style]) => {
                    const block = contentState.getBlockForKey(selection.getFocusKey());
                    const targetStyle = block.getInlineStyleAt(selection.getFocusOffset() + (index - 1));
                    return ContentStateModifier(contentState).toggleInlineStyle(
                        selection.getFocusKey(),
                        selection.getFocusOffset() + (targetStyle.contains(style) ? index + 1 : index),
                        block.getLength(),
                        style,
                    ).result();
                }, Modifier.insertText(
                    this.props.editorState.getCurrentContent(),
                    selection,
                    chars,
                ));
            this.props.setEditorState(EditorState.push(
                this.props.editorState,
                result,
                'insert-characters',
            ));
            this.history += chars;
            return 'handled';
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
        const fragment = ContentState.createFromText(reverse(result));
        const contentState = Modifier.replaceWithFragment(
            this.props.editorState.getCurrentContent(),
            this.props.editorState.getSelection(),
            fragment.getBlockMap(),
        );
        this.onChange(EditorState.push(
            this.props.editorState,
            contentState,
            'insert-fragment',
        ));

        return 'handled';
    }

    render() {
        return (
            <div id="editor-old" onClick={() => this.editor.focus()}>
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
