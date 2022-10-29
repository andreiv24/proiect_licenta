import React, { useEffect, useReducer, useState } from "react";
import DashboardLayout from "hoc/dashboardLayout";
import { useDispatch, useSelector } from "react-redux";
import { removeCategorie } from "store/actions/categorii.actions";
import TabelCategorii from './tabelCategorii';
import { useHistory } from "react-router-dom";
import { getCategoriiAll } from "store/actions/categorii.actions";

const defaultValues = { denumire:[] }

const AdminCategorii = (props) => {
    const [removeModal, setRemoveModal] = useState(false);
    const [toRemove, setToRemove] = useState(null);
    const notificari = useSelector(state => state.notificari);
    const dispatch = useDispatch();
    const history = useHistory();

    const [searchValues] = useReducer(
        (state, newState) => ({...state, ...newState}),
        defaultValues
    );

    const gotoEdit = (id) => {
        history.push(`/contul_meu/admin/editare_categorie/${id}`)
    }

    const handleClose = () => {
        setRemoveModal(false)
    }
    const handleModal = (id) => {
        setToRemove(id);
        setRemoveModal(true);
    }

    const handleRemove = () => {
        dispatch(removeCategorie(toRemove))
    }

    useEffect(()=>{
        dispatch(getCategoriiAll(searchValues))
    },[dispatch,searchValues])

    useEffect(() => {
            handleClose();
            setRemoveModal(null)
        if(notificari && notificari.removeArticle){
            dispatch(getCategoriiAll(searchValues))
        }
    },[dispatch, notificari, searchValues])

    return (
        <DashboardLayout title="Categorii">
            <div className="products_table">
                <br />
                <TabelCategorii
                    removeModal={removeModal}
                    gotoEdit={(id) => gotoEdit(id)}
                    handleClose={() => handleClose()}
                    handleModal={(id) => handleModal(id)}
                    handleRemove={() => handleRemove()}
                />
            </div>
        </DashboardLayout>
    )
}

export default AdminCategorii;