/**
 * Created by Bondarev Evgeniy
 */
import PostMessage from '../../classes/PostMessage';


export const CHANGE_TEXT = 'FORM_COMMUNICATED_CHANGE_TEXT';

let syncListenFunc = null;


export function changeText(text) {
    return {
        type: CHANGE_TEXT,
        payload: text
    }
}

export function sync() {
    return (dispatch, getState) => {
        const {app} = getState();
        const {communicated} = getState().form;
        let listenWindows = [window.parent];

        if (app.isTopWindow) {
            listenWindows = [];
            const framesList = window.frames;
            for (let i = 0; i < framesList.length; i++) {
                listenWindows.push(framesList[i]);
            }
        }

        listenWindows.forEach((win) => {
            win.postMessage(new PostMessage({
                type: PostMessage.TYPE_COMMUNICATED_FORM,
                data: communicated.toObject()
            }), '*');
        });
    }
}

export function subscribeChanges() {
    return (dispatch, getState) => {
        syncListenFunc = (event) => {
            const {data} = event;
            if (data && data.type === PostMessage.TYPE_COMMUNICATED_FORM) {
                dispatch(changeText(data.payload.text));
            }
        };

        window.addEventListener('message', syncListenFunc, false);
    }
}

export function unsubscribeChanges() {
    return (dispatch, getState) => {
        if (syncListenFunc) {
            window.removeEventListener('message', syncListenFunc);
            syncListenFunc = null;
        }
    }
}