import React from 'react';
import DashboardLayout from "hoc/dashboardLayout";
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { errorHelper } from 'utils/tools';
import { useDispatch } from 'react-redux';
import { TextField,Button } from '@mui/material';
import { userUpdateProfile } from 'store/actions/user.actions';
import EmailStepper from './stepper';

const InformatiiUser = ({users}) => {
    const dispatch = useDispatch();
    const formik = useFormik({
        enableReinitialize:true,
        initialValues:{
            prenume: users.data.prenume,
            nume: users.data.nume,
        },
        validationSchema:Yup.object({
            prenume: Yup.string()
            .min(3,'Minim 3 caractere')
            .max(30,'Maxim 30 de caractere')
            .required('Introducerea prenumelui este obligatorie'),
            nume: Yup.string()
            .min(3,'Minim 3 caractere')
            .max(30,'Maxim 30 de caractere')
            .required('Introducerea numelui este obligatorie'),
        }),
        onSubmit:(values)=>{
            dispatch(userUpdateProfile(values))
        }
    });
    return(
        <DashboardLayout title="Schimbare date utilizator">
            <form className="mt-3 article_form" style={{maxWidth:'250px'}}
                onSubmit={formik.handleSubmit}
            >
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
                <Button
                    className="mb-3"
                    variant="contained"
                    color="primary"
                    type="submit"
                >
                    Editare profil
                </Button>
            </form>
            <hr />
            <div>
                <EmailStepper users={users}/>
            </div>
        </DashboardLayout>
    )
}

export default InformatiiUser;