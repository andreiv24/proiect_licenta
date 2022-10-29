import React, { useState } from "react";
import { Button } from "@mui/material";
import AuthFormRegister from './authFormRegister';
import AuthFormLogin from "./authFormLogin";
import PreventSignIn from "hoc/preventSignIn";

const RegisterLogin = (props) => {
    const [formType, setFormType] = useState(false);

    const toggleFormType = () => {
        setFormType(!formType);
    }

    return (
        <PreventSignIn>
        <div className="page_wrapper">
            <div className="container">
                <div className="register_login_container">
                    <div className="right">
                        <h2>{formType ? 'Cont nou' : 'Autentificare'}</h2>
                        {formType ?
                        <>
                            <AuthFormRegister
                                formType={formType}
                                {...props}
                            />
                            <br/>
                            <Button
                            variant="contained"
                            color="inherit"
                            size="small"
                            onClick={() => toggleFormType()}
                        >
                            {formType ? "Am deja cont" : "Nu am cont"}
                        </Button>
                        </>
                            :
                            <>
                            <AuthFormLogin
                                formType={formType}
                                {...props}
                            />
                            <br/>
                            <Button
                            variant="contained"
                            color="inherit"
                            size="small"
                            onClick={() => toggleFormType()}
                        >
                            {formType ? "Am deja cont" : "Nu am cont"}
                        </Button>
                        </>
                        }
                    </div>
                </div>
            </div>
        </div>
        </PreventSignIn>
    )
}

export default (RegisterLogin);