import nodemailer from "nodemailer";

import { app } from "components/firebase";

import { getAuth, createUserWithEmailAndPassword } from "firebase/auth";

export default async function handler(req, res) {
    
    if (req.method === 'GET') {
    }
    else if (req.method === 'POST') {
        try {
            const auth = await getAuth(app);

            const { email, password } = await req.body;

            const userid = await createUserWithEmailAndPassword(auth, email, password)

            // const transporter = await nodemailer.createTransport({
            //     host: 'mail.miqamedia.com',
            //     port: 465,
            //     secure: true,
            //     auth: {
            //         user: 'support@miqamedia.com',
            //         pass: 'Kw5xjXdizj6JguE'
            //     }
            // });

            // const info = await transporter.sendMail({
            //     from: '"Fred Foo 👻" <jaysanduke@gmail.com>', // sender address
            //     to: 'fiqijovilop@jollyfree.com', // list of receivers'
            //     subject: "Hello ✔", // Subject line
            //     text: "Hello world?", // plain text body
            //     html: "", // html body
            // });

            // Preview only available when sending through an Ethereal account
            // console.log("Preview URL: %s", nodemailer.getTestMessageUrl(info));

            res.status(200).json(
                auth,
                userid,
                { message: 'success' },
                // { "Message sent: %s": info.messageId },
                // { "Preview URL: %s": nodemailer.getTestMessageUrl(info) }
            );
        }
        catch (err) {
            console.log(err);
            res.status(400).json(err);
        }
    }
}