import React, { useState } from "react";
import { Form, Button } from "react-bootstrap";
import { useFormik } from "formik";
import * as Yup from 'yup';
import axios from 'axios';
import { getTokenCookie } from "utils/tools";
import Loader from "utils/loader";

const UploadImagine = ({imagineValue}) => {
    const [loading, setLoading] = useState(false);

    const formikImagine = useFormik({
        initialValues:{ imagine:'' },
        validationSchema: Yup.object({
            imagine: Yup.mixed().required('Imaginea produsului este obligatorie')
        }),
        onSubmit:(values)=>{
            setLoading(true);
            let formData = new FormData();
            formData.append("file", values.imagine);
            axios.post(`/api/produse/upload`,formData,{
                headers:{
                    'content-type':'multipart/form-data',
                    'Authorization':`Bearer ${getTokenCookie()}`
                }
            }).then( response => {
                imagineValue(response.data)
            }).catch(error => {
                alert(error)
            }).finally(()=>{
                setLoading(false)
            });
        }
    })

    return(
        <>
            {
                loading ?
                    <Loader/>
                :
                <Form onSubmit={formikImagine.handleSubmit}>
                    <Form.Group>
                        <Form.Control
                            type="file"
                            name="file"
                            onChange={(event)=>{
                                formikImagine.setFieldValue("imagine", event.target.files[0])
                            }}
                        />
                        {
                            formikImagine.errors.imagine && formikImagine.touched.imagine ?
                                <div>Nu s-a găsit nicio imagine</div>
                            :null
                        }
                    </Form.Group>
                    <Button variant="secondary" type="submit">
                        Încărcare imagine
                    </Button>
                </Form>
            }
        </>
    )
}

export default UploadImagine;