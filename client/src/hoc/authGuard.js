import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import Loader from "utils/loader";
import { useHistory } from "react-router-dom";

export default function authGuard(ComposedComponent){
    const AuthCheck = (props) => {
        const [isAuth, setIsAuth] = useState(false);
        const users = useSelector( state => state.users );
        const history = useHistory();

        useEffect(()=>{
            if(!users.auth){
                history.push('/')
            }else{
                setIsAuth(true);
            }
        },[history,users]);

        if(!isAuth){
            return(
                <Loader full={true}/>
            )
        } else {
            return(
                <ComposedComponent users={users} {...props}/>
            )
        }
    }
    return AuthCheck;
}