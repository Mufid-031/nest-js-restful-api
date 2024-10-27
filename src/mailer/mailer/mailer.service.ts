/* eslint-disable prettier/prettier */
import { Injectable } from '@nestjs/common';
import * as nodemailer from 'nodemailer';

@Injectable()
export class MailerService {

    transporter: any;

    constructor() {
        this.transporter = nodemailer.createTransport({
            service: 'gmail',
            auth: {
                user: process.env.MAILER_EMAIL,
                pass: process.env.MAILER_PASSWORD,
            },
        });
    }

    async sendEmail(
        to: string,
        subject: string,
        text: string,
        html?: string,
    ) {
        const mailOptions = {
            from: process.env.MAILER_EMAIL,
            to,
            subject,
            text,
            html,
        };
    
        try {
            const info = await this.transporter.sendMail(mailOptions);
            console.log('Message sent:', info.messageId);
            return info;
        } catch (error) {
            console.log(error);
            throw error;
        }
    }
}
