import React from 'react';
import {Editor, Modifier, EditorState} from 'draft-js';
import {reverse} from '../util';

import './index.less';
import substitutes from './substitute';

class CustomEditor extends Editor {
    constructor(props) {
        super(props);
        this.state = {history: ''};

        this.onChange = this.onChange.bind(this);
        this.handleBeforeInput = this.handleBeforeInput.bind(this);
    }

    get history() {
        return this.state.history;
    }

    set history(text) {
        this.setState({history: text});
    }

    onChange(editorState) {
        this.props.setEditorState(editorState);
    }

    handleBeforeInput(chars) {
        if (substitutes.hasPrefix(reverse(chars))) {
            const selection = this.props.editorState.getSelection();
            const block = this.props.editorState.getCurrentContent().getBlockForKey(selection.getFocusKey());
            const text = block.getText().slice(
                Math.max(0, selection.getAnchorOffset() - substitutes.length),
                selection.getFocusOffset()
            );
            const prefix = substitutes.findPrefixes(reverse(text + chars))[0];
            if (prefix) {
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

    render() {
        return (
            <div id="editor" onClick={() => this.editor.focus()}>
                <Editor
                    ref={(component) => { this.editor = component; }}
                    onChange={this.onChange}
                    editorState={this.props.editorState}
                    handleBeforeInput={this.handleBeforeInput}
                />
                <div style={{color: 'red'}}>{this.history}</div>
            </div>
        );
    }
}

export default CustomEditor;
