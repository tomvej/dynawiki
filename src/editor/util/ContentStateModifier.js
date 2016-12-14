import {Record} from 'immutable';
import {Modifier, SelectionState} from 'draft-js';

class ContentStateModifier extends Record({contentState: null}) {

    setBlockType(blockKey, blockType) {
        const selection = SelectionState.createEmpty(blockKey);
        return Modifier.setBlockType(this.contentState, selection, blockType);
    }

    setInlineStyle(blockKey, start, end, inlineStyle) {
        const selection = SelectionState.createEmpty(blockKey).merge({
            anchorOffset: start,
            focusOffset: end,
        });
        return Modifier.applyInlineStyle(this.contentState, selection, inlineStyle);
    }

    result() {
        return this.contentState;
    }
}

export default (contentState) => new ContentStateModifier({contentState});
