import {combineReducers} from 'redux-immutable';
import editor from './editor';

export default combineReducers({
    [editor.NAME]: editor.reducer,
});
