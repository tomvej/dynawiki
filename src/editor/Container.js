import {connect} from 'react-redux';
import {Editor} from 'draft-js';

import {getEditorState} from './selectors';
import {setEditorState} from './actions';

const mapStateToProps = (state) => ({
    editorState: getEditorState(state),
});

const mapDispatchToProps = (dispatch) => ({
    onChange: (editorState) => dispatch(setEditorState(editorState)),
});

export default connect(mapStateToProps, mapDispatchToProps)(Editor);
