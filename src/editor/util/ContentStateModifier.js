import {Record} from 'immutable';
import {CharacterMetadata} from 'draft-js';

class ContentStateModifier extends Record({contentState: null}) {

    setBlockType(blockKey, blockType) {
        return this.setIn(['contentState', 'blockMap', blockKey, 'type'], blockType);
    }

    setInlineStyle(blockKey, start, end, inlineStyle) {
        return this.updateIn(['contentState', 'blockMap', blockKey, 'characterList'],
            (list) => list.splice(start, end - start,
                list.slice(start, end).map((charData) => CharacterMetadata.applyStyle(charData, inlineStyle))
            )
        );
    }

    result() {
        return this.contentState;
    }
}

export default (contentState) => new ContentStateModifier({contentState});
