import React from 'react';
import { Link } from 'react-router-dom';

import 'bootstrap/dist/css/bootstrap.min.css';

const Header = ({ users, signOutUser }) => {
    return (
        <header className="bck_b_light">
            <div className="container">
                <div className="left">
                    <div className="logo">
                        <Link to="/">
                            <img src="/imagini/logo-edunet.png" alt="EDUNET" width="160" height="90" />
                        </Link>
                    </div>
                </div>
                <div className="right">
                    <div className="top">
                        {users.auth ?
                            <>
                                <Link to="/librarie">
                                    Librărie
                                </Link>
                                <div className="cart_link">
                                    <Link to="/contul_meu/user/cos_cumparaturi">
                                        Coș de cumpărături
                                    </Link>
                                </div>
                                <Link to="/contul_meu">
                                    Bun venit, {users.data.prenume}
                                </Link>
                                <span
                                    onClick={() => signOutUser('log out')}
                                >
                                    Deconectare
                                </span>
                            </>
                            :
                            <>
                                <Link to="/librarie">
                                    Librărie
                                </Link>
                                <Link to="/autentificare">
                                    Cont nou / Autentificare
                                </Link>
                            </>
                        }
                    </div>
                </div>
            </div>
        </header>
    )

}

export default Header;