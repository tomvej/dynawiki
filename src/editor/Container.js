import {connect} from 'react-redux';
import {compose} from 'redux';
import Editor from './Editor';
import {getEditorState} from './selectors';
import {setEditorState} from './actions';

const mapStateToProps = (state) => ({
    editorState: getEditorState(state),
});

const mapDispatchToProps = (dispatch) => ({
    setEditorState: compose(dispatch, setEditorState),
});

export default connect(mapStateToProps, mapDispatchToProps)(Editor);
