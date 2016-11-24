import {EditorState} from 'draft-js';
import {Record} from 'immutable';

import {SET_EDITOR_STATE, ADD_CHARACTERS} from './actions';

class State extends Record({
    editorState: EditorState.createEmpty(),
    history: '',
}) {
    setEditorState(newValue) {
        return this.set('editorState', newValue);
    }
    setHistory(newValue) {
        return this.set('history', newValue);
    }
}

export default (state = new State(), action) => {
    switch (action.type) {
        case SET_EDITOR_STATE:
            return state.setEditorState(action.editorState);
        case ADD_CHARACTERS:
            return state.setHistory(state.history.concat(action.characters));
        default:
            return state;
    }
};
