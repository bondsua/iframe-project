/**
 * Created by Bondarev Evgeniy
 */
import { Record } from 'immutable';

import * as actionTypes from '../../actions/form/communicated';

const initialState = new Record({
    text: '',
})();


export default function communicated(state = initialState, action) {
    switch (action.type) {
        case actionTypes.CHANGE_TEXT:
            return state.merge({
                text: action.payload
            });


        default:
            return state;
    }
}