import React from 'react';
import {connect} from 'react-redux';
import {Editor, Modifier, EditorState} from 'draft-js';
import {compose} from 'redux';

import {reverse} from '../util';

import './index.less';
import {getEditorState} from './selectors';
import {setEditorState} from './actions';
import substitutes from './substitute';

const CustomEditor = (props) => {
    let editor;
    return (
        <div id="editor" onClick={() => editor.focus()}>
            <Editor
                {...props}
                ref={(component) => { editor = component; }}
            />
        </div>
    );
};

const mapStateToProps = (state) => ({
    editorState: getEditorState(state),
});

const mapDispatchToProps = (dispatch) => ({
    onChange: compose(dispatch, setEditorState),
});

const mergeProps = ({editorState}, {onChange}) => ({
    editorState,
    onChange,
    handleBeforeInput: (chars) => {
        if (substitutes.hasPrefix(reverse(chars))) {
            const selection = editorState.getSelection();
            const block = editorState.getCurrentContent().getBlockForKey(selection.getFocusKey());
            const text = block.getText().slice(
                Math.max(0, selection.getAnchorOffset() - substitutes.length),
                selection.getFocusOffset()
            );
            const prefix = substitutes.findPrefixes(reverse(text + chars))[0];
            if (prefix) {
                const length = prefix.key.length - chars.length;
                const replaceSelection = selection.set('anchorOffset', selection.getAnchorOffset() - length);
                const contentState = Modifier.replaceText(
                    editorState.getCurrentContent(),
                    replaceSelection,
                    prefix.value
                );

                onChange(EditorState.push(
                    editorState,
                    contentState,
                    'insert-characters'
                ));
                return 'handled';
            }
        }
        return 'not-handled';
    },
});

export default connect(mapStateToProps, mapDispatchToProps, mergeProps)(CustomEditor);
