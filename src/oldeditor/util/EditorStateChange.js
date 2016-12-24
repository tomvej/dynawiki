import {Record} from 'immutable';

const getBlockKeys = (editorState) => editorState.getCurrentContent().getBlockMap().keySeq().toSet();
const getBlock = (editorState, key) => editorState.getCurrentContent().getBlockForKey(key);

export default class EditorStateChange extends Record({from: null, to: null}) {
    constructor(from, to) {
        super({from, to});
    }
    hasSelectionChanged() {
        return this.from.getSelection() !== this.to.getSelection();
    }
    hasContentChanged() {
        return this.from.getCurrentContent() !== this.to.getCurrentContent();
    }
    getLastChangeType() {
        return this.to.getLastChangeType();
    }
    getAddedBlocks() {
        return getBlockKeys(this.to).subtract(getBlockKeys(this.from));
    }
    getRemovedBlocks() {
        return getBlockKeys(this.from).subtract(getBlockKeys(this.to));
    }
    getModifiedBlocks() {
        return getBlockKeys(this.to).intersect(getBlockKeys(this.from))
            .filter((key) => getBlock(this.from, key) !== getBlock(this.to, key));
    }
    getChangedBlocks() {
        return this.getAddedBlocks().union(this.getModifiedBlocks());
    }
}
