import {EditorState} from 'draft-js';
import {SET_EDITOR_STATE} from './actions';

export default (state = EditorState.createEmpty(), action) => (action.type === SET_EDITOR_STATE ? action.editorState : state);
