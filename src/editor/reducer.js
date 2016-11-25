import {EditorState, Modifier} from 'draft-js';

import {SET_EDITOR_STATE, SUBSTITUTE} from './actions';

const handleSubstitute = (editorState, {target, length}) => {
    const selection = editorState.getSelection();
    const replaceSelection = selection.set('anchorOffset', selection.getAnchorOffset() - length);
    const contentState = Modifier.replaceText(
        editorState.getCurrentContent(),
        replaceSelection,
        target
    );
    return EditorState.push(
        editorState,
        contentState,
        'insert-characters'
    );
};


export default (state = EditorState.createEmpty(), action) => {
    switch (action.type) {
        case SET_EDITOR_STATE:
            return action.editorState;
        case SUBSTITUTE:
            return handleSubstitute(state, action);
        default:
            return state;
    }
};
