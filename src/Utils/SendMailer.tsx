
import { MessageEmailSentOptions } from '@/Types/Types';
import { NextResponse } from 'next/server';
import nodemailer from 'nodemailer';

const SendEmail = async (options:MessageEmailSentOptions) => {

const transporter = nodemailer.createTransport({
    service:process.env.EMAL_SERVICE,
    from:process.env.EMAIL_FROM,
    host: process.env.EMAL_HOST,
    port: parseInt(process.env.EMAIL_PORT as string),
    secure: true, 
    auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS
        }
});

    try {
        const  mailOptions = {
            from: process.env.SITE_TITLE,
            to: options.to,
            subject: options.subject,
            text: options.text,
            html: options.html
        };
        await transporter.sendMail(mailOptions);
        return NextResponse.json({message:'Reset Code Sent To Your Email Successfully'},{status:201})
    
    } catch (error) {
        return NextResponse.json({message:'Faild To Send Reset Code ',error},{status:500})
            }
            };


export default SendEmail;

