import {Record} from 'immutable';
import {Modifier, SelectionState} from 'draft-js';

class ContentStateModifier extends Record({contentState: null}) {

    setContentState(contentState) {
        return this.set('contentState', contentState);
    }

    setBlockType(blockKey, blockType) {
        return this.setIn(['contentState', 'blockMap', blockKey, 'type'], blockType);
    }

    setInlineStyle(blockKey, start, end, inlineStyle) {
        const selection = SelectionState.createEmpty(blockKey).merge({
            anchorOffset: start,
            focusOffset: end,
        });
        return this.setContentState(Modifier.applyInlineStyle(this.contentState, selection, inlineStyle));
    }

    result() {
        return this.contentState;
    }
}

export default (contentState) => new ContentStateModifier({contentState});
