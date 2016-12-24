import React, {Component, PropTypes} from 'react';
import {Editor, EditorState} from 'draft-js';

import './index.less';

class CustomEditor extends Component {
    render() {
        return (
            <div id="editor" onClick={() => this.editorComponent.focus()}>
                <Editor
                    ref={(component) => { this.editorComponent = component; }}
                    editorState={this.props.editorState}
                    onChange={this.props.setEditorState}
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
