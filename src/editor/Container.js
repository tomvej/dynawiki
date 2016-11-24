import React from 'react';
import {connect} from 'react-redux';
import {Editor} from 'draft-js';

import './index.less';

import {getEditorState, getHistory} from './selectors';
import {setEditorState, addCharacters, substitute} from './actions';
import substitutions from './substitutions';

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
    history: getHistory(state),
});

const mapDispatchToProps = (dispatch) => ({
    onChange: (editorState) => dispatch(setEditorState(editorState)),
    sendAddCharacters: (chars) => dispatch(addCharacters(chars)),
    sendSubstitute: (source) => dispatch(substitute(source)),
});

const mergeProps = ({editorState, history}, {onChange, sendAddCharacters, sendSubstitute}) => ({
    editorState,
    onChange,
    handleBeforeInput: (chars) => {
        const source = Object.keys(substitutions).find((property) => history.concat(chars).endsWith(property));
        if (source) {
            sendSubstitute(source);
            return 'not-handled';
        } else {
            sendAddCharacters(chars);
            return 'not-handled';
        }
    },
});

export default connect(mapStateToProps, mapDispatchToProps, mergeProps)(CustomEditor);
