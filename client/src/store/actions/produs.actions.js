import * as actions from './index';
import axios from "axios";

import { getAuthHeader } from '../../utils/tools';

axios.defaults.headers.post['Content-Type'] = 'application/json';

export const produseBySort = ({limit,sortBy,order,where}) => {
    return async(dispatch)=>{
        try{
            const produse = await axios.get(`/api/produse/all`,{
                params:{
                    limit,
                    sortBy,
                    order
                }
            });
            switch(where){
                case 'bySold':
                    dispatch(actions.produseBySold(produse.data));
                break;
                case 'byDate':
                    dispatch(actions.produseByDate(produse.data));
                break;
                default:
                    return false
            }
        }catch(error){
            dispatch(actions.errorGlobal(error.response.data.message))
        }
    }
}

export const produseByPaginate = (args) => {
    return async(dispatch)=>{
        try{
            const produse = await axios.post(`/api/produse/paginate/all`,args)
            dispatch(actions.produseByPaginate(produse.data));
        }catch(error){
            dispatch(actions.errorGlobal(error.response.data.message))
        }
    }
}

export const removeProdus = (id) => {
    return async(dispatch)=>{
        try{
            await axios.delete(`/api/produse/produs/${id}`,getAuthHeader())
            dispatch(actions.removeProdus());
            dispatch(actions.successGlobal());
        }catch(error){
            dispatch(actions.errorGlobal(error.response.data.message))
        }
    }
}

export const addProdus = (data) => {
    return async(dispatch)=>{
        try{
            const produs = await axios.post(`/api/produse/`, data, getAuthHeader())
            dispatch(actions.addProdus(produs.data));
            dispatch(actions.successGlobal());
        }catch(error){
            dispatch(actions.errorGlobal("Produsul există deja"))
        }
    }
}

export const produseById = (id) => {
    return async(dispatch)=>{
        try{
            const produs = await axios.get(`/api/produse/produs/${id}`);
            dispatch(actions.produseById(produs.data));
        }catch(error){
            dispatch(actions.errorGlobal("Produsul nu a fost găsit"))
        }
    }
}

export const editProdus = (values, id) => {
    return async(dispatch)=>{
        try{
            await axios.patch(`/api/produse/produs/${id}`,values,getAuthHeader());
            dispatch(actions.successGlobal("Datele produsului au fost actualizate cu succes"));
        }catch(error){
            dispatch(actions.errorGlobal(error.response.data.message))
        }
    }
}