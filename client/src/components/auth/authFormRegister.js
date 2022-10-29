import React, { useEffect, useState } from "react";
import { useFormik } from 'formik';
import * as Yup from 'yup';
import Loader from 'utils/loader';
import { errorHelper } from "utils/tools";

import { useDispatch, useSelector } from 'react-redux';
import { TextField, Button} from "@mui/material";
import { userRegister, userSignIn } from "store/actions/user.actions";
import { useHistory } from "react-router-dom";

const AuthFormRegister = (props) => {
    const history = useHistory();
    const notificari = useSelector(state=>state.notificari);
    const [loading,setLoading] = useState(false);
    const dispatch = useDispatch();
    const formik = useFormik({
        initialValues:{ prenume:'', nume:'', email:'', parola:'' },
        validationSchema:Yup.object({
            prenume:Yup.string()
            .required('Introducerea prenumelui este obligatorie'),
            nume:Yup.string()
            .required('Introducerea numelui este obligatorie'),
            email:Yup.string()
            .required('Adresa de e-mail este obligatorie')
            .email('Adresa de e-mail este invalidă'),parola:Yup.string()
            .required('Parola este obligatorie')
        }),
        onSubmit:(values)=>{
            setLoading(true);
            handleSubmit(values)
        }
    })

    const handleSubmit = (values) => {
        if(props.formType){
            dispatch(userRegister(values))
        }else{
            dispatch(userSignIn(values))
        }
    }

    useEffect(()=>{
        if (notificari && notificari.success){
            history.push('/contul_meu')
        }else{
            setLoading(false);
        }
    },[notificari,history])

    return(
        <>
            <div className="auth_container">
                {   loading ?
                    <Loader/>
                    :
                    <form className="mt-3" onSubmit={formik.handleSubmit}>
                        <div className="form-group">
                            <TextField
                                style={{width:'100%'}}
                                name="prenume"
                                label="Introduceți prenumele"
                                variant="outlined"
                                {...formik.getFieldProps('prenume')}
                                {...errorHelper(formik,'prenume')}
                            />
                        </div>
                        <p></p>
                        <div className="form-group">
                            <TextField
                                style={{width:'100%'}}
                                name="nume"
                                label="Introduceți numele"
                                variant="outlined"
                                {...formik.getFieldProps('nume')}
                                {...errorHelper(formik,'nume')}
                            />
                        </div>
                        <p></p>
                        <div className="form-group">
                            <TextField
                                style={{width:'100%'}}
                                name="email"
                                label="Introduceți adresa de e-mail"
                                variant="outlined"
                                {...formik.getFieldProps('email')}
                                {...errorHelper(formik,'email')}
                            />
                        </div>
                        <p></p>
                        <div className="form-group">
                            <TextField
                                style={{width:'100%'}}
                                name="parola"
                                label="Introduceți parola"
                                variant="outlined"
                                type="password"
                                {...formik.getFieldProps('parola')}
                                {...errorHelper(formik,'parola')}
                            />
                        </div>
                        <p></p>
                        <Button
                            variant="contained"
                            color="primary"
                            size="small"
                            type="submit"
                        >
                            {props.formType ? 'Creare cont nou' : 'Autentificare'}
                        </Button>
                    </form>
                }
            </div>
        </>
    )
}

export default AuthFormRegister;