import {Modifier, EditorState, SelectionState, RichUtils} from 'draft-js';
import {blockType, changeType} from './constants';
import {ContentStateModifier} from './util';

const characterMap = {
    '` ': blockType.CODE,
    '> ': blockType.BLOCKQUOTE,
    '* ': blockType.UNORDERED_LIST,
    '# ': blockType.ORDERED_LIST,
    '= ': blockType.HEADING,
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

    addDepth(editorState) {
        switch (RichUtils.getCurrentBlockType(editorState)) {
            case blockType.ORDERED_LIST:
            case blockType.UNORDERED_LIST:
                return this.addDepthToList(editorState);
            default:
                return editorState;
        }
    }

    addDepthToList(editorState) {
        const blockKey = editorState.getSelection().getFocusKey();
        const block = editorState.getCurrentContent().getBlockForKey(blockKey);
        const prevBlock = editorState.getCurrentContent().getBlockBefore(blockKey);
        if (prevBlock && prevBlock.getType() === block.getType() && block.getDepth() <= prevBlock.getDepth()) {
            const newEditorState = EditorState.push(
                editorState,
                ContentStateModifier.updateDepth(editorState.getCurrentContent(), blockKey, 1),
                changeType.ADJUST_DEPTH,
            );
            return EditorState.forceSelection(
                newEditorState,
                editorState.getSelection(),
            );
        }
        return editorState;
    }

    removeDepth(editorState) {
        switch (RichUtils.getCurrentBlockType(editorState)) {
            case blockType.ORDERED_LIST:
            case blockType.UNORDERED_LIST:
            default:
                return editorState;
        }
    }

}
