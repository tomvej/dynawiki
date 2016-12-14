import {Record} from 'immutable';

class ContentStateModifier extends Record({target: null}) {

    setBlockType(blockKey, newType) {
        return this.setIn(['target', 'blockMap', blockKey, 'type'], newType);
    }

    result() {
        return this.target;
    }
}

export default (contentStyle) => new ContentStateModifier({target: contentStyle});
