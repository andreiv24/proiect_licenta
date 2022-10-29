const nodemailer = require('nodemailer');
const mailgen = require('mailgen');
require('dotenv').config();

let transporter = nodemailer.createTransport({
    service:"Gmail",
    secure:true,
    auth:{
        user: process.env.EMAIL,
        pass: process.env.PAROLA_EMAIL
    }
});

const registerEmail = async(userEmail,user) => {
    try{
        const emailToken = user.generateRegisterToken();
        let mailGenerator = new mailgen({
            theme:"cerberus",
            product:{
                logo:"https://res.cloudinary.com/dvlaiumig/image/upload/v1661260381/proiect_licenta/logo-edunet_wvcbdj.png",
                logoHeight:"100px",
                name:"Librăria Edunet",
                link:`${process.env.URL_EMAIL}`,
                copyright: '© 2022 Librăria Edunet. Toate drepturile rezervate.'
            }
        });

        const email = {
            body:{
                name:userEmail,
                greeting:'Către',
                intro: 'Bine ați venit pe platforma librăriei online Edunet!',
                action:{
                    instructions: 'Pentru a vă verifica contul, apăsați pe butonul de mai jos:', 
                    button:{
                        color: '#002fc0',
                        text: 'Verificare cont',
                        link: `${process.env.ADRESA_WEB_VERIFICARE_CONT}verificare?validation=${emailToken}`
                    }
                },
                outro: 'Dacă aveți nevoie de ajutor, reply la acest e-mail.',
                signature:'Cu stimă'
            }
        }

        let emailBody = mailGenerator.generate(email);
        let message = {
            from: process.env.EMAIL,
            to:userEmail,
            subject: "Bine ați venit pe Edunet",
            html:emailBody
        };

        await transporter.sendMail(message);
        return true;

    }catch(error){
        throw error
    }
}

const changedEmail = async(userEmail,user) => {
    try{
        const emailToken = user.generateRegisterToken();
        let mailGenerator = new mailgen({
            theme:"cerberus",
            product:{
                logo:"https://res.cloudinary.com/dvlaiumig/image/upload/v1661260381/proiect_licenta/logo-edunet_wvcbdj.png",
                logoHeight:"100px",
                name:"Librăria Edunet",
                link:`${process.env.URL_EMAIL}`,
                copyright: '© 2022 Librăria Edunet. Toate drepturile rezervate.'
            }
        });

        const email = {
            body:{
                name:userEmail,
                greeting:'Către',
                intro: 'Schimbarea adresei de e-mail a fost efectuată cu succes!',
                action:{
                    instructions: 'Pentru a vă verifica contul pe această adresă, apăsați pe butonul de mai jos:', 
                    button:{
                        color: '#002fc0',
                        text: 'Verificare cont',
                        link: `${process.env.ADRESA_WEB_VERIFICARE_CONT}verificare?validation=${emailToken}`
                    }
                },
                outro: 'Dacă aveți nevoie de ajutor, reply la acest e-mail.',
                signature:'Cu stimă'
            }
        }

        let emailBody = mailGenerator.generate(email);
        let message = {
            from: process.env.EMAIL,
            to:userEmail,
            subject: "Schimbare adresă de e-mail",
            html:emailBody
        };

        await transporter.sendMail(message);
        return true;

    }catch(error){
        throw error
    }
}

module.exports = {
    registerEmail,changedEmail
}