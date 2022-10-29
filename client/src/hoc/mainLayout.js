import React, { useEffect } from 'react';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import { showToast } from 'utils/tools';

import { useSelector, useDispatch } from 'react-redux';
import { clearNotificare } from 'store/actions/index';


const MainLayout = (props) => {
    const notificari = useSelector(state => state.notificari);
    const dispatch = useDispatch()

    useEffect(()=>{
        if(notificari && notificari.error){
            const msg = notificari.msg ? notificari.msg : 'Eroare';
            showToast('ERROR',msg);
            dispatch(clearNotificare());
        }
        if(notificari && notificari.success){
            const msg = notificari.msg ? notificari.msg : 'Reușit!';
            showToast('SUCCESS',msg);
            dispatch(clearNotificare());
        }

    },[notificari,dispatch])


    return(
        <>
            {props.children}
            <ToastContainer/>
        </>

    )
}

export default MainLayout;