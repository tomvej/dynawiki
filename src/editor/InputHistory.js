import {EditorStateChange} from './util';
import {changeType} from './constants';

export default class InputHistory {
    constructor() {
        this.history = '';
    }

    handleBeforeInput(chars) {
        this.history += chars;
    }

    handleChange(oldEditorState, newEditorState) {
        const diff = new EditorStateChange(oldEditorState, newEditorState);
        if (diff.isContentChanged()) {
            switch (diff.getLastChangeType()) {
                case changeType.INSERT_CHARACTERS:
                    break;
                case changeType.BACKSPACE_CHARACTER:
                    this.history = this.history.slice(0, -1);
                    break;
                default:
                    this.history = '';
                    break;
            }
        } else if (diff.isSelectionChanged()) {
            this.history = '';
        }
    }
}
