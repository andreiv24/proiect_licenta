import React from 'react';
import PhoneIcon from '@mui/icons-material/Phone';
import EmailIcon from '@mui/icons-material/Email';
import FacebookIcon from '@mui/icons-material/Facebook';
import TwitterIcon from '@mui/icons-material/Twitter';
import InstagramIcon from '@mui/icons-material/Instagram';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';

const Footer = () => {
    const site = useSelector(state => state.site)

    return (
        <footer className="bck_b_dark">
            <div className="container">
                <div className="logo">
                    <Link to="/">
                        <img src="/imagini/logo-edunet.png" alt="EDUNET" width="160" height="90" />
                    </Link>
                </div>
                {site && site.vars ?
                    <div className="wrapper">
                        <div className="left">
                            <h3>DATE DE CONTACT</h3>
                            <div className="business_nfo">
                                <div className="tag">
                                    <Link to={{ pathname: `tel:${site.vars.telefon}` }} target="_blank">
                                        <PhoneIcon />
                                        <div className="nfo">
                                            <div>Număr de telefon</div>
                                            <div>{site.vars.telefon}</div>
                                        </div>
                                    </Link>
                                </div>
                                <div className="tag">
                                    <Link to={{ pathname: `mailto:${site.vars.email}` }} target="_blank">
                                        <EmailIcon />
                                        <div className="nfo">
                                            <div>Adresă de e-mail</div>
                                            <div>{site.vars.email}</div>
                                        </div>
                                    </Link>
                                </div>
                            </div>
                        </div>
                        <div className="right">
                            <h3>NE GĂSIȚI ȘI PE SOCIAL MEDIA</h3>
                            <div className="business_nfo">
                                <div className="tag">
                                    <Link to={{ pathname: "https://facebook.com" }} target="_blank">
                                        <FacebookIcon />
                                        <div className="nfo">
                                            <div>Facebook</div>
                                        </div>
                                    </Link>
                                </div>
                                <div className="tag">
                                    <Link to={{ pathname: "https://twitter.com" }} target="_blank">
                                        <TwitterIcon />
                                        <div className="nfo">
                                            <div>Twitter</div>
                                        </div>
                                    </Link>
                                </div>
                                <div className="tag">
                                    <Link to={{ pathname: "https://instagram.com" }} target="_blank">
                                        <InstagramIcon />
                                        <div className="nfo">
                                            <div>Instagram</div>
                                        </div>
                                    </Link>
                                </div>
                            </div>
                        </div>
                    </div>
                    : null}
            </div>
        </footer>
    )

}

export default Footer;