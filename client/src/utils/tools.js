import React from 'react';
import { Link } from 'react-router-dom';
import { toast } from 'react-toastify';
import AddShoppingCartIcon from '@mui/icons-material/AddShoppingCart';
import cookie from 'react-cookies';

export const ApplicationButton = (props) => {
    let template = '';

    switch(props.type){
        case "default":
            template = <Link
                className={
                    !props.altClass ? 'link_default': props.altClass
                }
                to = {props.linkTo}
                style={{
                    ...props.style
                }}
            >
                {props.title}
            </Link>
        break;
        case "bag_link":
            template =
            <div
                className="bag_link"
                onClick={()=>{
                    props.runAction();
                }}
                style={{ ...props.style}}
            >
                <AddShoppingCartIcon style={{ fontSize: props.iconSize }}/>
            </div>
        break;
        case "adauga_in_cos":
                template =
                    <div className="add_to_cart_link"
                        onClick={()=> {
                            props.runAction();
                        }}
                    >
                        <AddShoppingCartIcon/>
                        Adaugă în coș
                    </div>
        break;
        default:
            template='';
    }

    return template;
}

export const renderCardImage = (imagine) => {
    if(imagine.length > 0){
        return imagine[0]
    }else{
        return '/imagini/imagine_indisponibila.png'
    }
}

export const showToast = (type, msg) => {
    switch(type){
        case 'SUCCESS':
            toast.success(msg,{
                position:toast.POSITION.BOTTOM_LEFT
            })
        break;
        case 'ERROR':
            toast.error(msg,{
                position:toast.POSITION.BOTTOM_LEFT
            })
        break;
        default:
            return false
    }
}

export const errorHelper = (formik,value) => ({
    error: formik.errors[value] && formik.touched[value] ? true : false,
    helperText: formik.errors[value] && formik.touched[value] ? formik.errors[value]:null
});

export const getTokenCookie = () => cookie.load('x-access-token');
export const removeTokenCookie = () => cookie.remove('x-access-token', {path:'/'});
export const getAuthHeader = () => {
    return { headers: {'Authorization':`Bearer ${getTokenCookie()}`}}
}