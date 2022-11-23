import nodemailer from "nodemailer";

const otpGenerator = require('otp-generator')

const Options = {
    upperCase: true,
    lowerCaseAlphabets: false,
    upperCaseAlphabets: false,
    specialChars: false
};


export default async function handler(req, res) {

    if (req.method === 'GET') {
        const otp = otpGenerator.generate(4, Options);
        res.status(200).json({ otp: otp });
    }
    else if (req.method === 'POST') {
        try {
            const { email } = await req.body;

            const otp = otpGenerator.generate(4, Options);

            const transporter = await nodemailer.createTransport({
                host: 'mail.miqamedia.com',
                port: 465,
                secure: true,
                auth: {
                    user: 'support@miqamedia.com',
                    pass: 'Kw5xjXdizj6JguE'
                }
            });

            const htmltemplate = `
            <div style="background-color: #f5f5f5; padding: 20px; border-radius: 10px; width: 100%; height: 100%;">
                <div style="background-color: #fff; padding: 20px; border-radius: 10px; width: 100%; height: 100%;">
                    <div style="text-align: center;">
                        <img src={public/img/brand/icon.png} alt="miqamedia-logo" style="width: 20px; height: auto;">
                    </div>
                    <div style="text-align: center; margin-top: 20px;">
                        <h1 style="font-size: 30px; font-weight: 600; color: #000;">Your OTP is: ${otp}</h1>
                    </div>
                </div>
            </div>
            `;

            const info = await transporter.sendMail({
                from: '"Miqa Media" <support@miqamedia.com>', // sender address
                to: email, // list of receivers'
                subject: "Reset password OTP (One Time Password)", // Subject line
                // text: "OTP: " + otp, // plain text body
                html: htmltemplate, // html body
            });

            // Preview only available when sending through an Ethereal account
            // console.log("Preview URL: %s", nodemailer.getTestMessageUrl(info));

            res.status(200).json(
                {
                    otp: otp,
                    message: 'Reset OTP sent successfully',
                    "Message sent: %s": info.messageId,
                    "Preview URL: %s": nodemailer.getTestMessageUrl(info)
                }
            );

        }
        catch (err) {
            console.log(err);
            res.status(400).json(err);
        }
    }

}