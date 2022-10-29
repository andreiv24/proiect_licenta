import {
    GET_CATEGORII_ALL,
    ADD_CATEGORIE,
    CLEAR_ADD_CATEGORIE,
    GET_CATEGORIE_BY_ID
} from '../types';

export default function categoriiReducer(state = {}, action) {
    switch (action.type) {
        case GET_CATEGORII_ALL:
            return { ...state, all: action.payload }
        case ADD_CATEGORIE:
            return { ...state, lastAdded: action.payload }
        case CLEAR_ADD_CATEGORIE:
            return {...state, lastAdded: null}
        case GET_CATEGORIE_BY_ID:
            return {...state, byId: action.payload}
        default:
            return state
    }
}