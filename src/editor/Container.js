import {connect} from 'react-redux';
import {compose} from 'redux';

import {getEditorState} from './selectors';
import {setEditorState} from './actions';
import Editor from './Editor';

const mapStateToProps = (state) => ({
    editorState: getEditorState(state),
});

const mapDispatchToProps = (dispatch) => ({
    setEditorState: compose(dispatch, setEditorState),
});

export default connect(mapStateToProps, mapDispatchToProps)(Editor);
