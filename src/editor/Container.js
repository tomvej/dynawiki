import React from 'react';
import {connect} from 'react-redux';
import {Editor} from 'draft-js';

import './index.less';

import {getEditorState} from './selectors';
import {setEditorState} from './actions';

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
    onChange: (editorState) => dispatch(setEditorState(editorState)),
});

export default connect(mapStateToProps, mapDispatchToProps)(CustomEditor);
