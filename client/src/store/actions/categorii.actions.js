import * as actions from './index';
import axios from 'axios';

import { getAuthHeader } from '../../utils/tools';

axios.defaults.headers.post['Content-Type'] = 'application/json';

export const getCategoriiAll = () => {
    return async(dispatch)=>{
        try{
            const categorii = await axios.get(`/api/categorii/all`);
            dispatch(actions.getCategoriiAll(categorii.data))
        }catch(error){
            dispatch(actions.errorGlobal(error.response.data.message))
        }
    }
}

export const removeCategorie = (id) => {
    return async(dispatch)=>{
        try{
            await axios.delete(`/api/categorii/categorie/${id}`,getAuthHeader())
            dispatch(actions.removeCategorie());
            dispatch(actions.successGlobal());
        }catch(error){
            dispatch(actions.errorGlobal(error.response.data.message))
        }
    }
}

export const addCategorie = (data) => {
    return async(dispatch)=>{
        try{
            const categorie = await axios.post(`/api/categorii/categorie`, data, getAuthHeader())
            dispatch(actions.addCategorie(categorie.data));
            dispatch(actions.successGlobal());
        }catch(error){
            dispatch(actions.errorGlobal("Categoria există deja"))
        }
    }
}

export const editCategorie = (values, id) => {
    return async(dispatch)=>{
        try{
            await axios.patch(`/api/categorii/categorie/${id}`,values,getAuthHeader());
            dispatch(actions.successGlobal("Categoria a fost actualizată cu succes"));
        }catch(error){
            dispatch(actions.errorGlobal(error.response.data.message))
        }
    }
}

export const categoriiById = (id) => {
    return async(dispatch)=>{
        try{
            const categorie = await axios.get(`/api/categorii/categorie/${id}`);
            dispatch(actions.categoriiById(categorie.data));
        }catch(error){
            dispatch(actions.errorGlobal("Categoria nu a fost găsită"))
        }
    }
}