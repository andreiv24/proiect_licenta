import * as actions from './index';
import axios from 'axios';

import { getAuthHeader, removeTokenCookie, getTokenCookie } from '../../utils/tools';

axios.defaults.headers.post['Content-Type'] = 'application/json';

export const userRegister = (values) => {
    return async(dispatch)=>{
        try{
            const user = await axios.post(`/api/auth/register`,{
                prenume:values.prenume,
                nume:values.nume,
                email:values.email,
                parola:values.parola
            });
            dispatch(actions.userAuth({data: user.data.user, auth: true}))
            dispatch(actions.successGlobal('Bun venit! Veți primi e-mailul pentru verificarea contului'))
        }catch(error){
            dispatch(actions.errorGlobal(error.response.data.message))
        }
    }
}

export const userSignIn = (values) => {
    return async(dispatch)=>{
        try{
            const user = await axios.post(`/api/auth/signin`,{
                email:values.email,
                parola:values.parola
            });
            dispatch(actions.userAuth({data: user.data.user, auth: true}))
            dispatch(actions.successGlobal('Bun venit!'))
        }catch(error){
            dispatch(actions.errorGlobal(error.response.data.message))
        }
    }
}

export const userIsAuth = () => {
    return async(dispatch)=>{
        try{
            const site = await axios.get(`/api/site`);
            dispatch(actions.siteGetVars(site.data))
            if(!getTokenCookie()){
                throw new Error();
            }
            const user = await axios.get(`/api/auth/isauth`,getAuthHeader());
            
            dispatch(actions.userAuth({data: user.data, auth: true}))
        }catch(error){
            dispatch(actions.userAuth({data:{},auth:false}));
        }
    }
}

export const userSignOut = () => {
    return async(dispatch)=>{
        removeTokenCookie();
        dispatch(actions.userSignOut())
        dispatch(actions.successGlobal('La revedere!'))
    }
}

export const userUpdateProfile = (data) => {
    return async(dispatch, getState)=>{
        try{
            const profile = await axios.patch(`/api/users/profil`,{
                data:data
            }, getAuthHeader());
            const userData ={
                ...getState().users.data,
                prenume: profile.data.prenume,
                nume: profile.data.nume,
            }
            dispatch(actions.userUpdateProfile(userData))
            dispatch(actions.successGlobal('Profilul a fost actualizat'))
        }catch(error){
            dispatch(actions.errorGlobal(error.response.data.message))
        }
    }
}

export const userChangeEmail = (data) => {
    return async(dispatch)=>{
        try{
            await axios.patch(`/api/users/email`,{
                email: data.email,
                emailnou: data.emailnou
            }, getAuthHeader());
            dispatch(actions.userUpdateProfile(data.emailnou))
            dispatch(actions.successGlobal('Adresa de e-mail a fost actualizată! Verificați contul cu noile date.')) 
        }catch(error){
            dispatch(actions.errorGlobal(error.response.data.message))
        }
    }
}

export const userAdaugareInCos = (item) => {
    return async(dispatch, getState)=>{
        try{
            const cos = getState().users.cos;
            dispatch(actions.userAdaugareInCos([
                ...cos,
                item
            ]))
            dispatch(actions.successGlobal(`Produsul "${item.denumire_produs}" a fost adăugat în coș`))
        }catch(error){
            dispatch(actions.errorGlobal(error.response.data.message))
        }
    }
}

export const scoatereProdusDinCos = (pozitie) => {
    return async(dispatch, getState)=>{
        try{
            const cos = getState().users.cos;
            cos.splice(pozitie,1);
            dispatch(actions.userAdaugareInCos(cos));
        }catch(error){
            dispatch(actions.errorGlobal(error.response.data.message))
        }
    }
}

export const userPurchaseSuccess = (orderID) => {
    return async(dispatch)=>{
        try{
            const user = await axios.post(`/api/tranzactie/`,{
                orderID
            },getAuthHeader());
            dispatch(actions.successGlobal('Vă mulțumim că ați cumpărat de la noi!'))
            dispatch(actions.userPurchaseSuccess(user.data))
        }
        catch(error){
            dispatch(actions.errorGlobal(error.response.data.message))
        }
    }
}