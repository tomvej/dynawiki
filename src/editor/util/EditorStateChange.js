import {Record} from 'immutable';

export default class EditorStateChange extends Record({from: null, to: null}) {
    constructor(from, to) {
        super({from, to});
    }

    isSelectionChanged() {
        return this.from.getSelection() !== this.to.getSelection();
    }
    isContentChanged() {
        return this.from.getCurrentContent() !== this.to.getCurrentContent();
    }
    getLastChangeType() {
        return this.to.getLastChangeType();
    }
}
