import nodemailer from "nodemailer";

import { database } from "components/firebase";

import { app } from "components/firebase";
import { getAuth, createUserWithEmailAndPassword } from "firebase/auth";
import { ref, push, update, remove, onValue, get, set } from "firebase/database";

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

            const { invitemaillist, workspaceid, ownerdetails } = await req.body;

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
                await createUserWithEmailAndPassword(auth, email, password).then(
                    async (userCredential) => {
                        const htmltemplate = `
            <div style="background-color: #f5f5f5; padding: 20px; border-radius: 10px; width: 100%; height: 100%;">
                <div style="background-color: #fff; padding: 20px; border-radius: 10px; width: 100%; height: 100%;">
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
                        });

                        await update(
                            ref(database, "users/" + userCredential.user.uid + "/invites"),
                            {
                                [workspaceid]: {
                                    ownerdetails: ownerdetails,
                                    workspaceid: workspaceid,
                                    createddate: Date.now(),
                                    status: "pending",
                                },
                            }
                        ).then(() => {
                            console.log("Workspace added to user!");
                        });
                    }
                );
            });

            // Preview only available when sending through an Ethereal account
            // console.log("Preview URL: %s", nodemailer.getTestMessageUrl(info));

            await res.status(200).json({
                auth,
                // // userid,
                message: "success",
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
