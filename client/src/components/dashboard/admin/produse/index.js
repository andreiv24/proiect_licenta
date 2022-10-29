import React, { useEffect, useReducer, useState } from "react";
import DashboardLayout from "hoc/dashboardLayout";
import { useDispatch, useSelector } from "react-redux";
import { produseByPaginate, removeProdus } from "store/actions/produs.actions";
import TabelProduse from './tabelProduse';
import { useHistory } from "react-router-dom";
import { useFormik } from "formik";
import * as Yup from 'yup';
import { errorHelper } from "utils/tools";
import { TextField } from "@mui/material";
import { Button } from 'react-bootstrap';

const defaultValues = { cuvinte_cheie:'', categorie:[], min:0, max:10000, domeniul_educational:[], page:1 }

const AdminProduse = (props) => {
    const [removeModal, setRemoveModal] = useState(false);
    const [toRemove, setToRemove] = useState(null)
    const produse = useSelector(state => state.produse);
    const notificari = useSelector(state => state.notificari);
    const dispatch = useDispatch();
    const history = useHistory();

    const [searchValues, setSearchValues] = useReducer(
        (state, newState) => ({...state, ...newState}),
        defaultValues
    );

    const formik = useFormik({
        initialValues: { cuvinte_cheie:'' },
        validationSchema: Yup.object({
            cuvinte_cheie: Yup.string()
            .min(3, 'Minim 3 caractere')
            .max(200, 'Căutare prea lungă')
        }),
        onSubmit:(values, { resetForm })=>{
            setSearchValues({cuvinte_cheie: values.cuvinte_cheie, page:1})
            resetForm();
        }
    })

    const gotoEdit = (id) => {
        history.push(`/contul_meu/admin/editare_produs/${id}`)
    }

    const gotoPage = (page) => {
        setSearchValues({page:page});
    }

    const handleClose = () => {
        setRemoveModal(false)
    }
    const handleModal = (id) => {
        setToRemove(id);
        setRemoveModal(true);
    }

    const handleRemove = () => {
        dispatch(removeProdus(toRemove))
    }

    const resetSearch = () => {
        setSearchValues(defaultValues)
    }

    useEffect(()=>{
        dispatch(produseByPaginate(searchValues))
    },[dispatch,searchValues])

    useEffect(()=>{
        handleClose();
        setRemoveModal(null)
        if(notificari && notificari.removeArticle){
            dispatch(produseByPaginate(searchValues))
        }
    },[dispatch, notificari, searchValues])

    return(
        <DashboardLayout title="Produse">
            <div className="products_table">
                <div>
                    <form className="mt-3" onSubmit={formik.handleSubmit}>
                        <TextField
                            style={{width:'100%'}}
                            name="cuvinte_cheie"
                            label="Introdu cuvintele potrivite pentru a căuta"
                            variant="outlined"
                            {...formik.getFieldProps('cuvinte_cheie')}
                            {...errorHelper(formik, 'cuvinte_cheie')}
                        />
                        <Button type="submit">
                            Căutare
                        </Button>
                    </form>
                    <Button onClick={()=> resetSearch()}>
                        Resetare date
                    </Button>
                </div>
                <hr/>
                <TabelProduse
                    removeModal={removeModal}
                    prods={produse.byPaginate}
                    prev={(page)=>gotoPage(page)}
                    next={(page)=>gotoPage(page)}
                    gotoEdit={(id)=>gotoEdit(id)}
                    handleClose={()=>handleClose()}
                    handleModal={(id)=>handleModal(id)}
                    handleRemove={()=>handleRemove()}
                />
            </div>
        </DashboardLayout>
    )
}

export default AdminProduse;