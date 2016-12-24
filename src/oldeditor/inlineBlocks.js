import {Set, Map} from 'immutable';
import {styleChars, styles} from './constants';
import {ContentStateModifier} from './util';

const getInitial = () => Map(Object.values(styles).reduce((result, style) => Object.assign({[style]: 0}, result), {}));

const parseBlock = (contentState, blockKey) => {
    const text = contentState
        .getBlockForKey(blockKey)
        .getText();
    const [newContentState, previous, finalStyle] = text
        .split('')
        .reduce(([content, prev, style], char, index) => {
            const charStyle = styleChars[char];
            if (charStyle) {
                const hasStyle = style.contains(charStyle);
                const modifier = ContentStateModifier(content);
                return [
                    hasStyle
                        ? modifier.applyInlineStyle(blockKey, prev.get(charStyle), index, charStyle).result()
                        : modifier.removeInlineStyle(blockKey, prev.get(charStyle), index, charStyle).result(),
                    prev.set(charStyle, index),
                    hasStyle ? style.remove(charStyle) : style.add(charStyle),
                ];
            } else {
                return [content, prev, style];
            }
        }, [contentState, getInitial(), Set()]);
    return Object.values(styles).reduce((resultContentState, style) => {
        const modifier = ContentStateModifier(resultContentState);
        if (finalStyle.contains(style)) {
            return modifier.applyInlineStyle(blockKey, previous.get(style), text.length, style).result();
        } else {
            return modifier.removeInlineStyle(blockKey, previous.get(style), text.length, style).result();
        }
    }, newContentState);
};

export default (diff, contentState) => diff.getChangedBlocks().reduce(parseBlock, contentState);
