import React from 'react';
import {connect} from 'react-redux';
import {Editor} from 'draft-js';
import {compose} from 'redux';

import {reverse} from '../util';

import './index.less';
import {getEditorState} from './selectors';
import {setEditorState, substitute} from './actions';
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
    sendSubstitute: compose(dispatch, substitute),
});

const mergeProps = ({editorState}, {onChange, sendSubstitute}) => ({
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
                sendSubstitute(prefix.value, prefix.key.length - chars.length);
                return 'handled';
            }
        }
        return 'not-handled';
    },
});

export default connect(mapStateToProps, mapDispatchToProps, mergeProps)(CustomEditor);
