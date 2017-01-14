import React from 'react';
import {Map} from 'immutable';
import {DefaultDraftBlockRenderMap} from 'draft-js';
import {blockType} from './constants';

const customMap = Map({
    [blockType.BLOCKQUOTE]: {
        element: 'div',
        wrapper: <blockquote />,
    },
    [blockType.CODE]: {
        element: 'div',
        wrapper: <pre />,
    },
    [blockType.HEADING]: {},
});

export default DefaultDraftBlockRenderMap.merge(customMap);
