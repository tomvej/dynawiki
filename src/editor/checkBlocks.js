import {ContentStateModifier} from './util';

const getHeaderLevel = (level) => {
    switch (level) {
        case 1:
            return 'one';
        case 2:
            return 'two';
        case 3:
            return 'three';
        default:
            return 'four';
    }
};

export default (diff) => diff.getChangedBlocks().reduce((contentState, blockKey) => {
    const block = contentState.getBlockForKey(blockKey);
    /* header */
    if (block.getText().startsWith('=')) {
        const level = block.getText().match(/^=*/)[0].length;
        return ContentStateModifier(contentState).setBlockType(blockKey, `header-${getHeaderLevel(level)}`).result();

    /* block quote */
    } else if (block.getText().startsWith('>')) {
        return ContentStateModifier(contentState).setBlockType(blockKey, 'blockquote').result();
    } else {
        return ContentStateModifier(contentState).setBlockType(blockKey, 'unstyled').result();
    }
}, diff.to.getCurrentContent());
