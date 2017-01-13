import React, {Component, PropTypes} from 'react';
import {Editor, EditorState} from 'draft-js';
import InputHistory from './InputHistory';

import './index.less';

class CustomEditor extends Component {
    constructor(props) {
        super(props);
        this.history = new InputHistory(this.editorState);

        this.handleBeforeInput = this.handleBeforeInput.bind(this);
        this.handleChange = this.handleChange.bind(this);
    }

    get editorState() {
        return this.props.editorState;
    }
    set editorState(newEditorState) {
        return this.props.setEditorState(newEditorState);
    }

    handleBeforeInput(chars) {
        this.history.handleBeforeInput(chars);
        return 'not-handled';
    }

    handleChange(editorState) {
        this.history.handleChange(this.editorState, editorState);
        this.editorState = editorState;
    }

    render() {
        return (
            <div id="editor" onClick={() => this.editorComponent.focus()}>
                <Editor
                    ref={(component) => { this.editorComponent = component; }}
                    editorState={this.editorState}
                    onChange={this.handleChange}
                    handleBeforeInput={this.handleBeforeInput}
                />
            </div>
        );
    }
}

CustomEditor.propTypes = {
    editorState: PropTypes.instanceOf(EditorState).isRequired,
    setEditorState: PropTypes.func.isRequired,
};

export default CustomEditor;
