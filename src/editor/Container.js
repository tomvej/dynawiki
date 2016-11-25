import React from 'react';
import {connect} from 'react-redux';
import {Editor} from 'draft-js';
import {compose} from 'redux';

import './index.less';

import {getEditorState} from './selectors';
import {setEditorState, substitute} from './actions';

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
    handleBeforeInput: () => 'not-handled',
});

export default connect(mapStateToProps, mapDispatchToProps, mergeProps)(CustomEditor);
