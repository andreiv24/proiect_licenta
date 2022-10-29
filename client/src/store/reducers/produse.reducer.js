import {
    GET_PRODUS_BY_SOLD,
    GET_PRODUS_BY_DATE,
    GET_PRODUS_BY_PAGINATE,
    GET_PRODUS_BY_ID,
    ADD_PRODUS,
    CLEAR_ADD_PRODUS,
    CLEAR_PRODUS_CURENT
} from '../types';

export default function produseReducer(state={},action){
    switch(action.type){
        case GET_PRODUS_BY_SOLD:
            return {...state, bySold: action.payload }
        case GET_PRODUS_BY_DATE:
            return {...state, byDate: action.payload }
        case GET_PRODUS_BY_PAGINATE:
            return {...state, byPaginate: action.payload}
        case ADD_PRODUS:
            return {...state, lastAdded: action.payload}
        case CLEAR_ADD_PRODUS:
            return {...state, lastAdded: null}
        case GET_PRODUS_BY_ID:
            return {...state, byId: action.payload}
        case CLEAR_PRODUS_CURENT:
            return {...state, byId:''}
        default:
            return state
    }
}