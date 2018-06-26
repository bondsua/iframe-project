/**
 * Created by Bondarev Evgeniy
 */
export const STATUS_NOT_INITIALIZED = "APP_STATUS_NOT_INITIALIZED";
export const STATUS_READY = "APP_STATUS_READY";


export function notInitialized() {
    return {
        type: STATUS_NOT_INITIALIZED,
    }
}

export function ready() {
    return {
        type: STATUS_READY,
    }
}