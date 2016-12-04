import React from 'react';
import {Editor, Modifier, EditorState} from 'draft-js';
import {reverse} from '../util';

import './index.less';
import substitutes from './substitute';

class CustomEditor extends Editor {
    constructor(props) {
        super(props);

        this.handleBeforeInput = this.handleBeforeInput.bind(this);
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

                this.props.setEditorState(EditorState.push(
                    this.props.editorState,
                    contentState,
                    'insert-characters'
                ));
                return 'handled';
            }
        }
        return 'not-handled';
    }

    render() {
        return (
            <div id="editor" onClick={() => this.editor.focus()}>
                <Editor
                    ref={(component) => { this.editor = component; }}
                    onChange={this.props.setEditorState}
                    editorState={this.props.editorState}
                    handleBeforeInput={this.handleBeforeInput}
                />
            </div>
        );
    }
}

export default CustomEditor;
