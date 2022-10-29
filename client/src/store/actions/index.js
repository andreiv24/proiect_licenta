import {
    GET_PRODUS_BY_SOLD,
    GET_PRODUS_BY_DATE,
    GET_PRODUS_BY_PAGINATE,
    GET_PRODUS_BY_ID,
    GET_CATEGORIE_BY_ID,
    REMOVE_PRODUS,
    REMOVE_CATEGORIE,
    ADD_PRODUS,
    ADD_CATEGORIE,
    CLEAR_ADD_PRODUS,
    CLEAR_ADD_CATEGORIE,
    CLEAR_PRODUS_CURENT,
    CLEAR_CATEGORIE_CURENTA,
    ERROR_GLOBAL,
    SUCCESS_GLOBAL,
    CLEAR_NOTIFICARE,
    AUTH_USER,
    SIGN_OUT,
    UPDATE_USER_PROFILE,
    USER_CHANGE_EMAIL,
    USER_ADAUGARE_IN_COS,
    USER_PURCHASE_SUCCESS,
    GET_CATEGORII_ALL,
    GET_SITE_VARS,
    UPDATE_SITE_VARS
} from '../types';

export const userAuth = (user) => ({
    type:AUTH_USER,
    payload: user
});

export const userSignOut = () => ({
    type:SIGN_OUT
})

export const produseBySold = (data) => ({
    type: GET_PRODUS_BY_SOLD,
    payload: data
})

export const produseByDate = (data) => ({
    type: GET_PRODUS_BY_DATE,
    payload: data
})

export const produseByPaginate = (produse) => ({
    type: GET_PRODUS_BY_PAGINATE,
    payload: produse
})

export const removeProdus = () => ({
    type: REMOVE_PRODUS
})

export const removeCategorie = () => ({
    type: REMOVE_CATEGORIE
})

export const addProdus = (produs) => ({
    type: ADD_PRODUS,
    payload: produs
})

export const addCategorie = (categorie) => ({
    type: ADD_CATEGORIE,
    payload: categorie
})

export const clearAddProdus = () => {
    return {
        type: CLEAR_ADD_PRODUS
    }
}

export const clearAddCategorie = () => {
    return {
        type: CLEAR_ADD_CATEGORIE
    }
}

export const produseById = (produs) => ({
    type: GET_PRODUS_BY_ID,
    payload: produs
})

export const categoriiById = (categorie) => ({
    type: GET_CATEGORIE_BY_ID,
    payload: categorie
})

export const clearProdusCurent = () => ({
    type: CLEAR_PRODUS_CURENT
})

export const clearCategorieCurenta = () => ({
    type: CLEAR_CATEGORIE_CURENTA
})

export const errorGlobal = (msg) => ({
    type: ERROR_GLOBAL,
    payload: msg
})

export const successGlobal = (msg) => ({
    type: SUCCESS_GLOBAL,
    payload: msg
})

export const clearNotificare = () => {
    return (dispatch) => {
        dispatch({
            type:CLEAR_NOTIFICARE
        })
    }
}

export const userUpdateProfile = (userdata) => ({
    type:UPDATE_USER_PROFILE,
    payload:userdata
})

export const userChangeEmail = (data) => ({
    type:USER_CHANGE_EMAIL,
    payload:data
})

export const userAdaugareInCos = (data) => ({
    type: USER_ADAUGARE_IN_COS,
    payload: data
})

export const userPurchaseSuccess = (data) => ({
    type: USER_PURCHASE_SUCCESS,
    payload: data
})

export const getCategoriiAll = (categorii) => ({
    type:GET_CATEGORII_ALL,
    payload: categorii
})

export const siteGetVars = (vars) => ({
    type:GET_SITE_VARS,
    payload: vars
})

export const updateSiteVars = (vars) => ({
    type:UPDATE_SITE_VARS,
    payload: vars
})