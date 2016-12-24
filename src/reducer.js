import {combineReducers} from 'redux-immutable';
import oldeditor from './oldeditor';
import editor from './editor';

export default combineReducers({
    [oldeditor.NAME]: oldeditor.reducer,
    [editor.NAME]: editor.reducer,
});
