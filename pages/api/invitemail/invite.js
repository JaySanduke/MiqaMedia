import nodemailer from "nodemailer";

import { app } from "components/firebase";
import { getAuth, createUserWithEmailAndPassword } from "firebase/auth";

const otpGenerator = require("otp-generator");

const Options = {
    upperCase: true,
    lowerCaseAlphabets: true,
    upperCaseAlphabets: true,
    specialChars: true,
};

export default async function handler(req, res) {
    if (req.method === "GET") {
    }
    else if (req.method === "POST") {
        try {

            const auth = await getAuth(app);

            const { email, workspaceid, workspacename, ownerdetails } = await req.body;

            const password = await otpGenerator.generate(8, Options);

            const transporter = await nodemailer.createTransport({
                host: 'mail.miqamedia.com',
                port: 465,
                secure: true,
                auth: {
                    user: 'support@miqamedia.com',
                    pass: 'Kw5xjXdizj6JguE'
                }
            });

            var user = {};


            await createUserWithEmailAndPassword(auth, email, password).then(
                async (userCredential) => {
                    user = userCredential.user;
                    return userCredential.user;
                }
            )
                .then(async (user) => {
                    const htmltemplate = `
                        <div style="background-color: #f5f5f5; padding: 20px; border-radius: 10px; width: 100%; height: 100%;">
                            <div style="background-color: #fff; padding: 20px; border-radius: 10px; width: 100%; height: 100%;">
                                <div style="text-align: center; margin-top: 20px;">
                                    <h1 style="font-size: 12px; font-weight: 600; color: #000;">Your are invited in workspace: ${workspacename} with workspace ID - ${workspaceid} by Owner: ${ownerdetails.name == null ? ownerdetails.email : ownerdetails.name}</h1>
                                </div>
                                <div style="text-align: center; margin-top: 20px;">
                                     <h1 style="font-size: 12px; font-weight: 600; color: #000;">Your email is: ${email} & password is: ${password}.</h1>
                               </div>
                              </div>
                        </div>
                        `;

                    const info = await transporter.sendMail({
                        from: '"Miqa Media" <support@miqamedia.com>', // sender address
                        to: email, // list of receivers'
                        subject: "Invitation for a workspace:", // Subject line
                        text: "Invitation#", // plain text body
                        html: htmltemplate, // html body {email, password}
                    })

                    await console.log("Invitation sent successfully");

                    await res.status(200).json({
                        email: email,
                        password: password,
                        user: user,
                        status: "success",
                        "Message sent: %s": await info.messageId,
                    })
                })
                .catch((err) => {
                    console.log(err);
                    let error = {
                        code: err.code,
                        message: err.message,
                    }
                    res.status(400).json({
                        email: email,
                        password: password,
                        user: user,
                        error: {
                            err,
                            error
                        },
                        status: "fail",
                    })
                });

        }
        catch (err) {
            console.log(err);
            res.status(400).json(err);
        }
    }
}