/**
 * Created by Bondarev Evgeniy
 */

export default class PostMessage {
    static TYPE_DEFAULT = 'DEFAULT';
    static TYPE_COMMUNICATED_FORM = 'COMMUNICATED_FORM';

    type;
    payload;

    constructor({type = PostMessage.TYPE_DEFAULT, data = {}}) {
        this.type = type;
        this.payload = data;
    }
}