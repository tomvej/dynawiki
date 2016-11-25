import {NAME} from './constants';

export const SET_EDITOR_STATE = `${NAME}/SET_EDITOR_STATE`;

export const SUBSTITUTE = `${NAME}/SUBSITUTE`;

export const setEditorState = (editorState) => ({
    type: SET_EDITOR_STATE,
    editorState,
});

export const substitute = (target, length) => ({
    type: SUBSTITUTE,
    target,
    length,
});
