/**
 * Created by Bondarev Evgeniy
 */
import { combineReducers } from 'redux';

import app from './app';
import form from './form';


export default combineReducers({
    app,
    form
});