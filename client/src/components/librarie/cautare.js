import React from "react";
import { useFormik } from "formik";
import * as Yup from 'yup';
import { errorHelper } from "utils/tools";

import { TextField } from "@mui/material";
import { Button } from "react-bootstrap";

const defaultCuvinteCheie = { cuvinte_cheie: '' }

const Cautare = (props) => {
    const formik = useFormik({
        initialValues:{ cuvinte_cheie: ''},
        validationSchema: Yup.object({
            cuvinte_cheie: Yup.string()
            .min(3,'Minim 3 caractere')
            .max(200,'Căutare prea lungă')
        }),
        onSubmit:(values, { resetForm })=>{
            props.handleKeywords(values.cuvinte_cheie)
            resetForm();
        }
    })
    const resetSearchLibrarie = () => {
        props.handleKeywords(defaultCuvinteCheie)
    }
    return(
        <div className="container">
            <form className="mt-3" onSubmit={formik.handleSubmit}>
                <div>
                    <TextField
                        style={{
                            width:'100%'
                        }}
                        placeholder="Căutați un produs"
                        name="cuvinte_cheie"
                        variant="outlined"
                        {...formik.getFieldProps('cuvinte_cheie')}
                        {...errorHelper(formik,'cuvinte_cheie')}
                    />
                </div>
                <Button type="submit">
                    Căutare
                </Button>
            </form>
            <Button onClick={resetSearchLibrarie}>
                 Resetare date
            </Button>
        </div>
    )
}

export default Cautare;