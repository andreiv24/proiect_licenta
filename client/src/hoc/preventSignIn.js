import React from "react";
import { useSelector } from "react-redux";
import { Redirect } from "react-router-dom";

const PreventSignIn = (props) => {
    const users = useSelector(state => state.users);

    return(
        <>
            {
                users.auth ?
                <Redirect to="/contul_meu"/>
                :
                props.children
            }
        </>
    )
}

export default PreventSignIn;