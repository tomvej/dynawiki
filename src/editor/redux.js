import {EditorState} from 'draft-js';
import {connect} from 'react-redux';
import {compose} from 'redux';
import {NAME} from './constants';
import Editor from './Editor';

/* ACTIONS */
const SET_EDITOR_STATE = `${NAME}/SET_EDITOR_STATE`;

const setEditorState = (editorState) => ({
    type: SET_EDITOR_STATE,
    editorState,
});

/* REDUCER */
export const reducer = (state = EditorState.createEmpty(), action) => (action.type === SET_EDITOR_STATE ? action.editorState : state);

/* SELECTORS */
const getModel = (state) => state.get(NAME);

/* CONTAINER */
const mapStateToProps = (state) => ({
    editorState: getModel(state),
});

const mapDispatchToProps = (dispatch) => ({
    setEditorState: compose(dispatch, setEditorState),
});

export const Container = connect(mapStateToProps, mapDispatchToProps)(Editor);
