
import nodemailer from 'nodemailer'
import { server } from './config/server.config.js';
export const gmail_api=(to,subject,text)=>{
const gmailauth = nodemailer.createTransport({
        service: "gmail",
        secure : true,
        port : 465,
        auth: {
            user: server.Gmailuser,
            pass: server.Gmailpass

        }
    });

    const receiver = {
        from : server.Gmailuser,
        to : to,
        subject :subject,
        text : text
    };

    gmailauth.sendMail(receiver, (error, emailResponse) => {
        if(error)
        throw error;
        console.log("success!");
        response.end();
    });
}
