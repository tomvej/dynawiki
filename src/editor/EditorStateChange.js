import {Record} from 'immutable';

const getBlockKeys = (editorState) => editorState.getCurrentContent().getBlockMap().keySeq().toSet();
const getBlock = (editorState, key) => editorState.getCurrentContent().getBlockForKey(key);

export default class EditorStateChange extends Record({previous: null, next: null}) {
    hasSelectionChanged() {
        return this.previous.getSelection() !== this.next.getSelection();
    }
    hasContentChanged() {
        return this.previous.getCurrentContent() !== this.next.getCurrentContent();
    }
    getLastChangeType() {
        return this.next.getLastChangeType();
    }
    getAddedBlocks() {
        return getBlockKeys(this.next).subtract(getBlockKeys(this.previous));
    }
    getRemovedBlocks() {
        return getBlockKeys(this.previous).subtract(getBlockKeys(this.next));
    }
    getChangedBlocks() {
        return getBlockKeys(this.next).intersect(getBlockKeys(this.previous))
            .filter((key) => getBlock(this.previous, key) !== getBlock(this.next, key));
    }
}
