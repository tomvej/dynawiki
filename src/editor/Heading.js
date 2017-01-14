import {createElement, PropTypes} from 'react';
import {ContentBlock, EditorBlock} from 'draft-js';

const Heading = (props) => createElement(`h${Math.min(6, props.block.getDepth() + 1)}`, {}, createElement(EditorBlock, props));

Heading.propTypes = {
    block: PropTypes.instanceOf(ContentBlock).isRequired,
};

export default Heading;
