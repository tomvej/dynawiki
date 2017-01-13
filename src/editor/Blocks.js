import {Modifier, EditorState} from 'draft-js';
import {blockType, changeType} from './constants';

const characterMap = {
    '` ': blockType.CODE,
    '> ': blockType.BLOCKQUOTE,
    '* ': blockType.UNORDERED_LIST,
    '# ': blockType.ORDERED_LIST,
    '= ': blockType.HEADER,
};

export default class Blocks {
    constructor(history) {
        this.history = history;
    }

    handleBeforeInput(editorState) {
        if (this.history.startsBlock) {
            const newType = characterMap[this.history.history];
            if (newType) {
                const contentStateWithoutHistory = Modifier.removeRange(
                    editorState.getCurrentContent(),
                    editorState.getSelection().set('anchorOffset', 0),
                    'forward',
                );
                const newContentState = Modifier.setBlockType(
                    contentStateWithoutHistory,
                    editorState.getSelection().set('anchorOffset', 0).set,
                    newType,
                );
                return EditorState.push(
                    editorState,
                    newContentState,
                    changeType.CHANGE_BLOCK_TYPE,
                );
            }
        }
        return editorState;
    }

}
