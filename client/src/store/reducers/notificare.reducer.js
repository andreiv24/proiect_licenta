import {
    ERROR_GLOBAL,
    SUCCESS_GLOBAL,
    CLEAR_NOTIFICARE,
    REMOVE_PRODUS,
    REMOVE_CATEGORIE
} from '../types';

export default function notificariReducer(state = {}, action) {
    switch (action.type) {
        case ERROR_GLOBAL:
            return { ...state, error: true, msg: action.payload }
        case SUCCESS_GLOBAL:
            return { ...state, success: true, msg: action.payload }
        case CLEAR_NOTIFICARE:
            return {}
        case REMOVE_PRODUS:
            return { ...state, removeArticle: true }
        case REMOVE_CATEGORIE:
            return { ...state, removeArticle: true }
        default:
            return state
    }
}