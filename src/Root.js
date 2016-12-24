import React from 'react';
import {Provider} from 'react-redux';

import './index.less';
import oldeditor from './oldeditor';

// eslint-disable-next-line react/prop-types, #scaffolding
const Root = ({store}) => (
    <Provider store={store}>
        <oldeditor.Container />
    </Provider>
);

export default Root;
