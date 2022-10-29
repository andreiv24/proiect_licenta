import React from "react";
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { errorHelper } from 'utils/tools';
import { useDispatch, useSelector } from "react-redux";
import { updateSiteVars } from "store/actions/site.actions";

import { TextField, Button } from "@mui/material";

const SiteVars = () => {
    const site = useSelector(state=>state.site);
    const dispatch = useDispatch();
    const formik = useFormik({
        initialValues:{
            telefon: site.vars.telefon,
            email: site.vars.email
        },
        validationSchema:Yup.object({
            telefon: Yup.string().min(5,"Minim 5 cifre").max(20,"Maxim 20 de cifre").required("Numărul de telefon este obligatoriu"),
            email: Yup.string().email("Adresa de e-mail nu este validă").required("Adresa de e-mail este obligatorie"),
        }),
        onSubmit:(values)=>{
            dispatch(updateSiteVars({
                _id: site.vars._id,
                ...values
            }))
        }
    })
    return (
        <>
            <form className="mt-3" onSubmit={formik.handleSubmit}>
                <div className="form-group">
                    <TextField
                        style={{ width: '50%' }}
                        name="telefon"
                        label="Introdu numărul de telefon"
                        variant="outlined"
                        {...formik.getFieldProps('telefon')}
                        {...errorHelper(formik,'telefon')}
                    />
                </div>
                <p></p>
                <div className="form-group">
                    <TextField
                        style={{ width: '50%' }}
                        name="email"
                        label="Introdu adresa de e-mail"
                        variant="outlined"
                        {...formik.getFieldProps('email')}
                        {...errorHelper(formik,'email')}
                    />
                </div>
                <p></p>
                <Button
                    variant="contained"
                    color="primary"
                    type="submit"
                >
                    Modifică datele de contact
                </Button>
            </form>
        </>
    )
}

export default SiteVars;