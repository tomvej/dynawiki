import {EditorState, Modifier, SelectionState} from 'draft-js';
import {Record} from 'immutable';
import {limit} from './substitutions';

import {SET_EDITOR_STATE, ADD_CHARACTERS, SUBSTITUTE} from './actions';

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

const handleSubstitute = (state, {target, length}) => {
    const selection = state.editorState.getSelection();
    const replaceSelection = selection.set('anchorOffset', selection.getAnchorOffset() - length);
    const contentState = Modifier.replaceText(
        state.editorState.getCurrentContent(),
        replaceSelection,
        target
    );
    return state.merge({
        editorState: EditorState.push(
            state.editorState,
            contentState,
            'insert-characters'
        ),
        history: '',
    });
};

const handleHistory = (state, characters) => {
    let history = state.history.concat(characters);
    if (history.length > limit) {
        history = history.substring(history.length - limit);
    }
    return state.setHistory(history);
};

export default (state = new State(), action) => {
    switch (action.type) {
        case SET_EDITOR_STATE:
            return handleEditorState(state, action.editorState);
        case ADD_CHARACTERS:
            return handleHistory(state, action.characters);
        case SUBSTITUTE:
            return handleSubstitute(state, action);
        default:
            return state;
    }
};
