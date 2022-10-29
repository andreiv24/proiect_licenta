import React, { useEffect, useState } from "react";
import DashboardLayout from "hoc/dashboardLayout";
import { useFormik } from "formik";
import { errorHelper } from "utils/tools";
import Loader from 'utils/loader';
import { useDispatch, useSelector } from "react-redux";
import { validation } from "./formValue";
import { addCategorie } from "store/actions/categorii.actions";
import { useHistory } from "react-router-dom";
import { clearAddCategorie } from "store/actions/index";

import { TextField, Button, Divider } from "@mui/material";

const AdaugareCategorie = (props) => {
    const [loading, setLoading] = useState(false);
    const notificari = useSelector(state=>state.notificari);
    const dispatch = useDispatch();
    const history = useHistory();
    const formik = useFormik({
        initialValues:{
            denumire:''
        },
        validationSchema: validation,
        onSubmit:(values)=>{
            handleSubmit(values)
        }
    });

    const handleSubmit = (values) => {
        setLoading(true);
        dispatch(addCategorie(values));
    }

    useEffect(()=>{
        if(notificari && notificari.success){
            history.push('/contul_meu/admin/categorii')
        }
        if(notificari && notificari.error){
            setLoading(false)
        }
    },[notificari, history])

    useEffect(()=>{
        return()=>{
            dispatch(clearAddCategorie())
        }
    },[dispatch])

    console.log(formik.values)

    return(
        <DashboardLayout title="Adăugare categorie">
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
                            Adăugare categorie
                        </Button>
                    </form>
                </>
            }
        </DashboardLayout>
    )
}

export default AdaugareCategorie;