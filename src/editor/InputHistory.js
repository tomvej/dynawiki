import {EditorStateChange} from './util';
import {changeType} from './constants';

export default class InputHistory {
    constructor(editorState) {
        this.clear(editorState);
    }

    handleBeforeInput(chars) {
        this.history += chars;
    }

    clear(editorState) {
        this.history = '';
        this.startsBlock = editorState.getSelection().isCollapsed() && editorState.getSelection().getStartOffset() === 0;
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
                    this.clear(newEditorState);
                    break;
            }
        } else if (diff.isSelectionChanged()) {
            this.clear(newEditorState);
        }
    }
}
