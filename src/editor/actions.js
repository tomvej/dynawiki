import {NAME} from './constants';

export const SET_EDITOR_STATE = `${NAME}/SET_EDITOR_STATE`;

export const ADD_CHARACTERS = `${NAME}/ADD_CHARACTERS`;

export const SUBSTITUTE = `${NAME}/SUBSITUTE`;

export const setEditorState = (editorState) => ({
    type: SET_EDITOR_STATE,
    editorState,
});

export const addCharacters = (characters) => ({
    type: ADD_CHARACTERS,
    characters,
});

export const substitute = (source) => ({
    type: SUBSTITUTE,
    source,
});
