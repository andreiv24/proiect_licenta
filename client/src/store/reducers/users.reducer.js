import {
    AUTH_USER, SIGN_OUT, UPDATE_USER_PROFILE, USER_CHANGE_EMAIL, USER_ADAUGARE_IN_COS, USER_PURCHASE_SUCCESS
} from '../types';

let DEFAULT_USER_STATE = {
    data:{
        _id:null,
        email:null,
        prenume:null,
        nume:null,
        istoric:[],
        verificat:null
    },
    auth:null,
    cos:[]
}

export default function usersReducer(state=DEFAULT_USER_STATE,action){
    switch(action.type){
        case AUTH_USER:
            return { ...state,
                data: { ...state.data, ...action.payload.data },
                auth: action.payload.auth
            }
        case SIGN_OUT:
            return {...state,
                data: { ...DEFAULT_USER_STATE.data },
                auth:false
            }
        case UPDATE_USER_PROFILE:
            return {
                ...state, data: {...action.payload}
            }
        case USER_CHANGE_EMAIL:
            return {
                ...state,
                data:{ ...state.data, email: action.payload }
            }
        case USER_ADAUGARE_IN_COS:
            return {...state, cos: action.payload}
        case USER_PURCHASE_SUCCESS:
            return {...state,
                data:{
                    ...state.data,
                    istoric: action.payload.istoric
                },
                cos:[]
            }
        default:
            return state
    }
}