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

const handleEditorState = (state, editorState) => state.setEditorState(editorState);

const handleHistory = (state, characters) => {
    const history = state.history.concat(characters);
    return state.setHistory(history);
};

export default (state = new State(), action) => {
    switch (action.type) {
        case SET_EDITOR_STATE:
            return handleEditorState(state, action.editorState);
        case ADD_CHARACTERS:
            return handleHistory(state, action.characters);
        default:
            return state;
    }
};
