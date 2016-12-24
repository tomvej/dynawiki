import {combineReducers} from 'redux-immutable';
import oldeditor from './oldeditor';

export default combineReducers({
    [oldeditor.NAME]: oldeditor.reducer,
});
