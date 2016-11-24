import {NAME} from './constants';

const getModel = (state) => state.get(NAME);

export const getEditorState = (state) => getModel(state).editorState;

export const getHistory = (state) => getModel(state).history;
