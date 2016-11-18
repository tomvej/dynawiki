import React from 'react';
import {Provider} from 'react-redux';

import './index.less';
import editor from './editor';

// eslint-disable-next-line react/prop-types, #scaffolding
const Root = ({store}) => (
    <Provider store={store}>
        <editor.Container />
    </Provider>
);

export default Root;
