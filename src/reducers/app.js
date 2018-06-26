/**
 * Created by Bondarev Evgeniy
 */
import { Record } from 'immutable';

import * as actionTypes from '../actions/app';

function isTopWindow() {
    return window.self === window.top;
}

class AppState extends Record({
    status: actionTypes.STATUS_NOT_INITIALIZED,
    isTopWindow: isTopWindow()
}) {
    isReady() {
        return this.status === actionTypes.STATUS_READY;
    }
}

const initialState = new AppState();

export default function app(state = initialState, action) {
    switch (action.type) {
        case actionTypes.STATUS_NOT_INITIALIZED:
        case actionTypes.STATUS_READY:
            return state.merge({
                status: action.type
            });


        default:
            return state;
    }
}