import React from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";

export const links = [
    {
        name:'Informații utilizator',
        linkTo:'/contul_meu'
    },
    {
        name:'Schimbare date utilizator',
        linkTo:'/contul_meu/user/schimbare_date'
    },
    {
        name:'Coș de cumpărături',
        linkTo:'/contul_meu/user/cos_cumparaturi'
    }
];

export const admin = [
    {
        name:'Produse',
        linkTo:'/contul_meu/admin/produse'
    },
    {
        name:'Categorii',
        linkTo:'/contul_meu/admin/categorii'
    },
    {
        name:'Date de contact ale site-ului',
        linkTo:'/contul_meu/admin/contact'
    }
]

const DashboardLayout = (props) => {
    const users = useSelector(state => state.users)
    const generateLinks = (data) => (
        data.map((item,i)=>(
            <Link to={item.linkTo} key={`${item.name}${i}`}>
                {item.name}
            </Link>
        ))
    )
    return(
        <div className="container">
            <div className="user_container page_container">
                <div className="user_left_nav">
                    <h2>Contul meu</h2>
                    <div className="links">
                        { generateLinks(links) }
                    </div>
                    {  users.data.rol === 'admin' ?
                    <div>
                        <h2>Secțiuni administrator</h2>
                        <div className="links">
                            { generateLinks(admin) }
                        </div>
                    </div>
                    :null}
                </div>
                <div className="user_right">
                    <div className="dashboard_title">
                        <h1>{props.title}</h1>
                    </div>
                    {props.children}
                </div>
            </div>
        </div>
    )
}

export default DashboardLayout;