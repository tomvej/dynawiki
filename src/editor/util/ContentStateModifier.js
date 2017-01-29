export default {
    updateDepth: (contentState, blockKey, increment) => contentState.updateIn(['blockMap', blockKey, 'depth'], (depth) => depth + increment),
};
