import {Record} from 'immutable';
import {CharacterMetadata} from 'draft-js';

class ContentStateModifier extends Record({contentState: null}) {

    setBlockType(blockKey, blockType) {
        return this.setIn(['contentState', 'blockMap', blockKey, 'type'], blockType);
    }

    changeInlineStyle(blockKey, start, end, mapper) {
        return this.updateIn(
            ['contentState', 'blockMap', blockKey, 'characterList'],
            (list) => list.splice(start, end - start, ...list.slice(start, end).map(mapper)),
        );
    }
    applyInlineStyle(blockKey, start, end, inlineStyle) {
        return this.changeInlineStyle(blockKey, start, end, (charData) => CharacterMetadata.applyStyle(charData, inlineStyle));
    }
    removeInlineStyle(blockKey, start, end, inlineStyle) {
        return this.changeInlineStyle(blockKey, start, end, (charData) => CharacterMetadata.removeStyle(charData, inlineStyle));
    }

    result() {
        return this.contentState;
    }
}

export default (contentState) => new ContentStateModifier({contentState});
