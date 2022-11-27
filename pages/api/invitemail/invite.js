import nodemailer from "nodemailer";

import { app } from "components/firebase";
import { getAuth, createUserWithEmailAndPassword } from "firebase/auth";

const otpGenerator = require('otp-generator')

const Options = {
    upperCase: true,
    lowerCaseAlphabets: true,
    upperCaseAlphabets: true,
    specialChars: true
};

export default async function handler(req, res) {

    if (req.method === 'GET') {
    }
    else if (req.method === 'POST') {
        try {
            const auth = await getAuth(app);

            const { invitemaillist } = await req.body;

            // html template for invitation mail
            const htmltemplate = `
            <div style="background-color: #f5f5f5; padding: 20px; border-radius: 10px; width: 100%; height: 100%;">
                <div style="background-color: #fff; padding: 20px; border-radius: 10px; width: 100%; height: 100%;">
                    <div style="display: flex; justify-content: center; align-items: center; flex-direction: column;">
                        <img src="https://firebasestorage.googleapis.com/v0/b/nextjs-1-0-0.appspot.com/o/Logo.png?alt=media&token
                                                    
                        <h1 style="font-size: 2rem; font-weight: 600; color: #000; margin: 0; margin-top: 20px;">Welcome to
                            <span style="color: #ff0000;">Work</span><span style="color: #0000ff;">Space</span></h1>
                            <p style="font-size: 1.2rem; font-weight: 400; color: #000; margin: 0; margin-top: 20px;">You have been invited to join a workspace on
                            <span style="color: #ff0000;">Work</span><span style="color: #0000ff;">Space</span></p>
                            <div style="display: flex; justify-content: center; align-items: center; flex-direction: column; margin-top: 20px;">
                                <a href="https://workspace-1-0-0.vercel.app/" style="text-decoration: none; background-color: #ff0000; color: #fff; padding: 10px 20px; border-radius: 5px; font-size: 1.2rem; font-weight: 600;">Join Workspace</a>
                                </div>
                                </div>
                                </div>
                                </div>
                                `;

            const transporter = await nodemailer.createTransport({
                host: 'mail.miqamedia.com',
                port: 465,
                secure: true,
                auth: {
                    user: 'support@miqamedia.com',
                    pass: 'Kw5xjXdizj6JguE'
                }
            });

            await invitemaillist.map(async (email) => {
                const password = await otpGenerator.generate(8, Options);
                await createUserWithEmailAndPassword(auth, email, password)
                    .then(async (userCredential) => {
                        const info = await transporter.sendMail({
                            from: '"Miqa Media" <support@miqamedia.com>', // sender address
                            to: email, // list of receivers'
                            subject: "Invitation for a workspace:", // Subject line
                            text: "Invitation#", // plain text body
                            html: htmltemplate, // html body
                        })
                    })
            });

            // Preview only available when sending through an Ethereal account
            // console.log("Preview URL: %s", nodemailer.getTestMessageUrl(info));

            await res.status(200).json({
                auth,
                // // userid,
                message: 'success',
                invitemaillist,
                // "Message sent: %s": info.messageId,
                // "Preview URL: %s": nodemailer.getTestMessageUrl(info)
            });
        }
        catch (err) {
            console.log(err);
            res.status(400).json(err);
        }
    }
}