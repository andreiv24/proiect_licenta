import React, { useState, useEffect } from 'react';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { useSelector, useDispatch } from 'react-redux';
import { userChangeEmail } from 'store/actions/user.actions';
import { errorHelper } from 'utils/tools';
import Loader from 'utils/loader';

import Modal from 'react-bootstrap/Modal';

import {
    TextField,
    Button,
    Stepper,
    Step,
    StepLabel
} from '@mui/material';

const EmailStepper = ({ users }) => {
    const [loading, setLoading] = useState(false);
    const [emailModal, setEmailModal] = useState(false);
    const notificari = useSelector(state => state.notificari);
    const dispatch = useDispatch();

    const [activeStep, setActiveStep] = useState(0);
    const steps = ['Adresa veche', 'Adresa nouă', 'Sunteți sigur?']

    const formik = useFormik({
        enableReinitialize: true,
        initialValues: { email: '', emailnou: '' },
        validationSchema: Yup.object({
            email: Yup.string()
                .required('Este necesar să introduceți adresa de e-mail')
                .email('Adresa de e-mail nu este validă')
                .test('match', 'Verificați emailul', (email) => {
                    return email === users.data.email
                }),
            emailnou: Yup.string()
                .required('Este necesar să introduceți adresa de e-mail')
                .email('Adresa de e-mail nu este validă')
                .test('match', 'Verificați emailul', (emailnou) => {
                    return emailnou !== users.data.email
                })
        }),
        onSubmit: (values) => {
            setLoading(true);
            dispatch(userChangeEmail(values));
        }
    });

    const closeModal = () => setEmailModal(false);
    const openModal = () => setEmailModal(true);

    const handleNext = () => {
        setActiveStep((prevActiveStep) => prevActiveStep + 1)
    }

    const handleBack = () => {
        setActiveStep((prevActiveStep) => prevActiveStep - 1)
    }

    const nextBtn = () => (
        <Button
            className="mt-3"
            variant="contained"
            color="primary"
            onClick={handleNext}
        >
            Înainte
        </Button>
    )

    const backBtn = () => (
        <Button
            className="mt-3 ml-2"
            variant="contained"
            color="secondary"
            onClick={handleBack}
        >
            Înapoi
        </Button>
    )

    useEffect(()=>{
        if (notificari && notificari.success){
            closeModal();
        }
        setLoading(false);
    },[notificari])

    return (
        <>
            <form className="mt-3 article_form" style={{ maxWidth: '370px' }}>
            <h3>Schimbare adresă de e-mail</h3>
            <br/>
            <h5>Adresă curentă de e-mail:</h5>
                <div className="form-group">
                    <TextField
                        style={{ width: '100%' }}
                        name="emailstatic"
                        variant="outlined"
                        value={users.data.email}
                        disabled
                    />
                </div>
                <p></p>
                <Button
                    className="mb-3"
                    variant="contained"
                    color="primary"
                    onClick={openModal}
                >
                    Editare e-mail
                </Button>
            </form>
            <Modal size="lg" centered show={emailModal} onHide={closeModal}>
                <Modal.Header closeButton>
                    <Modal.Title>Schimbare adresă de e-mail</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Stepper activeStep={activeStep} orientation='vertical'>
                        {
                            steps.map((label, index) => {
                                return (
                                    <Step key={label}>
                                        <StepLabel>{label}</StepLabel>
                                    </Step>
                                )
                            })
                        }
                    </Stepper>
                    <form className="mt-3 stepper_form" onSubmit={formik.handleSubmit}>
                    {activeStep === 0 ?
                        <div className="form-group">
                            <p></p>
                            <TextField
                                style={{ width: '100&' }}
                                name="email"
                                label="Introduceți adresa veche de e-mail"
                                variant="outlined"
                                {...formik.getFieldProps('email')}
                                {...errorHelper(formik, 'email')}
                            />
                            {
                                formik.values.email && !formik.errors.email ?
                                    nextBtn()
                                    : null
                            }
                        </div>
                        : null}

                    {activeStep === 1 ?
                        <div className="form-group">
                            <p></p>
                            <TextField
                                style={{ width: '100&' }}
                                name="emailnou"
                                label="Introduceți adresa nouă de e-mail"
                                variant="outlined"
                                {...formik.getFieldProps('emailnou')}
                                {...errorHelper(formik, 'emailnou')}
                            />
                            {
                                formik.values.emailnou && !formik.errors.emailnou ?
                                    nextBtn()
                                    : null
                            }
                            {backBtn()}
                        </div>
                        : null}

                    {activeStep === 2 ?
                        <div className="form-group">
                            { loading ?
                                <Loader />
                                :
                                <>
                                    <Button
                                        className="mt-3"
                                        variant="contained"
                                        color="primary"
                                        onClick={formik.submitForm}
                                    >
                                        Schimbați adresa de e-mail
                                    </Button>
                                    {backBtn()}
                                </>
                            }
                        </div>
                        : null}
                    </form>
                </Modal.Body>
            </Modal>
        </>
    )
}

export default EmailStepper;