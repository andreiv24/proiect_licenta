import React, { useEffect, useState } from "react";
import DashboardLayout from "hoc/dashboardLayout";
import { useFormik } from "formik";
import { errorHelper } from "utils/tools";
import Loader from 'utils/loader';
import { useDispatch, useSelector } from "react-redux";
import { validation, formValue, getValueToEdit  } from "./formValue";
import { editCategorie, categoriiById } from "store/actions/categorii.actions";
import { clearCategorieCurenta } from "store/actions/index";

import { TextField, Button, Divider } from "@mui/material";

const EditareCategorie = (props) => {
    const [values, setValues] = useState(formValue);
    const [loading, setLoading] = useState(false);
    const categorii = useSelector(state=>state.categorii);
    const notificari = useSelector(state=>state.notificari);
    const dispatch = useDispatch();
    const formik = useFormik({
        enableReinitialize:true,
        initialValues:values,
        validationSchema: validation,
        onSubmit:(values)=>{
            handleSubmit(values)
        }
    });

    const handleSubmit = (values) => {
        setLoading(true);
        dispatch(editCategorie(values, props.match.params.id));
    }

    useEffect(()=>{
        if(notificari){
            setLoading(false);
        }
    },[notificari])

    useEffect(()=>{
        const param = props.match.params.id;
        if(param){
            dispatch(categoriiById(param))
        }
    },[dispatch, props.match.params.id]);

    useEffect(()=>{
        if(categorii && categorii.byId){
            setValues(getValueToEdit(categorii.byId))
        }
    },[categorii])

    useEffect(()=>{
        return()=>{
            dispatch(clearCategorieCurenta())
        }
    },[dispatch])

    console.log(formik.values)

    return(
        <DashboardLayout title="Editare categorie">
            {
                loading ?
                <Loader/>
                :
                <>
                    <Divider className="mt-3 mb-3"/>
                    <form className="mt-3 article_form" onSubmit={formik.handleSubmit}>
                        <div className="form-group">
                            <TextField
                                style={{width:'100%'}}
                                name="denumire"
                                label="Introdu denumirea categoriei"
                                variant="outlined"
                                {...formik.getFieldProps('denumire')}
                                {...errorHelper(formik,'denumire')}
                            />
                        </div>
                        <br/>
                        <Button
                            variant="contained"
                            color="primary"
                            type="submit"
                        >
                            Editare categorie
                        </Button>
                    </form>
                </>
            }
        </DashboardLayout>
    )
}

export default EditareCategorie;