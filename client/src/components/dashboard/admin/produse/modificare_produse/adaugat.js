import React, { useEffect, useState } from "react";
import DashboardLayout from "hoc/dashboardLayout";
import { useFormik } from "formik";
import { errorHelper } from "utils/tools";
import Loader from 'utils/loader';
import { useDispatch, useSelector } from "react-redux";
import { validation } from "./formValues";
import { getCategoriiAll } from "store/actions/categorii.actions";
import { addProdus } from "store/actions/produs.actions";
import { useHistory } from "react-router-dom";
import { clearAddProdus } from "store/actions/index";
import UploadImagine from "./upload";
import ViewerImagine from "./viewerImagine";

import { TextField, Button, Divider, Select, MenuItem, FormControl, FormHelperText } from "@mui/material";

const AdaugareProdus = (props) => {
    const [loading, setLoading] = useState(false);
    const notificari = useSelector(state=>state.notificari);
    const categorii = useSelector(state=>state.categorii);
    const dispatch = useDispatch();
    const history = useHistory();
    const formik = useFormik({
        initialValues:{
            denumire_produs:'',
            categorie:'',
            domeniul_educational:'',
            descriere:'',
            pret:'',
            in_stoc:'',
            livrare:false,
            imagini:[]
        },
        validationSchema: validation,
        onSubmit:(values)=>{
            handleSubmit(values)
        }
    });

    const handleSubmit = (values) => {
        setLoading(true);
        dispatch(addProdus(values));
    }

    const handleImagineValue = (imagine) => {
        const imagineArray = formik.values.imagini;
        imagineArray.push(imagine.url);
        formik.setFieldValue('imagini',imagineArray)
    }

    const deleteImagine = (index) => {
        const imagineArray = formik.values.imagini;
        imagineArray.splice(index,1);
        formik.setFieldValue('imagini', imagineArray)
    }

    useEffect(()=>{
        if(notificari && notificari.success){
            history.push('/contul_meu/admin/produse')
        }
        if(notificari && notificari.error){
            setLoading(false)
        }
    },[notificari, history])

    useEffect(()=>{
        dispatch(getCategoriiAll());
    },[dispatch])

    useEffect(()=>{
        return()=>{
            dispatch(clearAddProdus())
        }
    },[dispatch])

    console.log(formik.values)

    return(
        <DashboardLayout title="Adăugare produs">
            {
                loading ?
                <Loader/>
                :
                <>
                    <ViewerImagine
                        formik={formik}
                        deleteImagine={(index)=> deleteImagine(index)}
                    />
                    <UploadImagine
                        imagineValue={(imagine)=> handleImagineValue(imagine)}
                    />
                    <Divider className="mt-3 mb-3"/>
                    <form className="mt-3 article_form" onSubmit={formik.handleSubmit}>
                    <div className="form-group">
                            <TextField
                                style={{width:'100%'}}
                                name="denumire_produs"
                                label="Introdu denumirea produsului"
                                variant="outlined"
                                {...formik.getFieldProps('denumire_produs')}
                                {...errorHelper(formik,'denumire_produs')}
                            />
                        </div>
                        <p></p>
                    <div className="form-group">
                            <FormControl variant="outlined">
                                <h5>Selectează categoria produsului</h5>
                                <Select
                                    name="categorie"
                                    {...formik.getFieldProps('categorie')}
                                    error={formik.errors.categorie && formik.touched.categorie ? true : false}
                                >
                                    <MenuItem value="">
                                        <em>None</em>
                                    </MenuItem>
                                    {
                                        categorii && categorii.all ?
                                            categorii.all.map((item)=>(
                                                <MenuItem key={item._id} value={item._id}>
                                                    {item.denumire}
                                                </MenuItem>
                                            ))
                                    :null}
                                </Select>
                                {formik.errors.categorie && formik.touched.categorie ?
                                    <FormHelperText error={true}>
                                        {formik.errors.categorie}
                                    </FormHelperText>
                                :null}
                            </FormControl>
                        </div>
                        <p></p>
                        <div className="form-group">
                            <TextField
                                style={{width:'100%'}}
                                name="descriere"
                                label="Introdu descrierea produsului"
                                variant="outlined"
                                {...formik.getFieldProps('descriere')}
                                {...errorHelper(formik,'descriere')}
                                multiline rows={4}
                            />
                        </div>
                        <p></p>
                        <div className="form-group">
                            <TextField
                                style={{width:'100%'}}
                                name="domeniul_educational"
                                label="Produsul este recomandat pentru:"
                                variant="outlined"
                                {...formik.getFieldProps('domeniul_educational')}
                                {...errorHelper(formik,'domeniul_educational')}
                            />
                        </div>
                        <p></p>
                        <Divider className="mt-3 mb-3"/>
                        <div className="form-group">
                            <TextField
                                style={{width:'100%'}}
                                name="in_stoc"
                                label="Câte produse sunt pe stoc?"
                                variant="outlined"
                                type="number"
                                {...formik.getFieldProps('in_stoc')}
                                {...errorHelper(formik,'in_stoc')}
                            />
                        </div>
                        <p></p>
                        <Divider className="mt-3 mb-3"/>
                        <div className="form-group">
                            <FormControl variant="outlined">
                                <h5>Produsul va fi livrat?</h5>
                                <Select
                                    name="livrare"
                                    {...formik.getFieldProps('livrare')}
                                    error={formik.errors.livrare && formik.touched.livrare ? true : false}
                                >
                                    <MenuItem value={false}><em>Nu</em></MenuItem>
                                    <MenuItem value={true}><em>Da</em></MenuItem>
                                </Select>
                                {formik.errors.livrare && formik.touched.livrare ?
                                    <FormHelperText error={true}>
                                        {formik.errors.livrare}
                                    </FormHelperText>
                                :null}
                            </FormControl>
                        </div>
                        <p></p>
                        <div className="form-group">
                            <TextField
                                style={{width:'100%'}}
                                name="pret"
                                label="Introdu prețul produsului"
                                variant="outlined"
                                type="number"
                                {...formik.getFieldProps('pret')}
                                {...errorHelper(formik,'pret')}
                            />
                        </div>
                        <Divider className="mt-3 mb-3"/>
                        <Button
                            variant="contained"
                            color="primary"
                            type="submit"
                        >
                            Adăugare produs
                        </Button>
                    </form>
                </>
            }
        </DashboardLayout>
    )
}

export default AdaugareProdus;