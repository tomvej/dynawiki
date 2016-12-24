import React from 'react';
import {Provider} from 'react-redux';

import './index.less';
import oldeditor from './oldeditor';
import editor from './editor';

// eslint-disable-next-line react/prop-types, #scaffolding
const Root = ({store}) => (
    <Provider store={store}>
        <div>
            <editor.Container />
            <br />
            <oldeditor.Container />
        </div>
    </Provider>
);

export default Root;
