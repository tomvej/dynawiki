import {Modifier, EditorState, SelectionState} from 'draft-js';
import {blockType, changeType} from './constants';

const characterMap = {
    '` ': blockType.CODE,
    '> ': blockType.BLOCKQUOTE,
    '* ': blockType.UNORDERED_LIST,
    '# ': blockType.ORDERED_LIST,
    '= ': blockType.HEADER,
};

export default class Blocks {
    handleBeforeInput(editorState, {startsBlock, history}) {
        if (startsBlock) {
            const newType = characterMap[history];
            if (newType) {
                const block = editorState.getSelection().getAnchorKey();
                const contentStateWithoutHistory = Modifier.removeRange(
                    editorState.getCurrentContent(),
                    editorState.getSelection().set('anchorOffset', 0),
                    'forward',
                );
                const newContentState = Modifier.setBlockType(
                    contentStateWithoutHistory,
                    editorState.getSelection(),
                    newType,
                );
                const newEditorState = EditorState.push(
                    editorState,
                    newContentState,
                    changeType.CHANGE_BLOCK_TYPE,
                );
                return EditorState.forceSelection(
                    newEditorState,
                    SelectionState.createEmpty(block),
                );
            }
        }
        return editorState;
    }
}
