"use server";

import nodemailer from "nodemailer";
import dotenv from "dotenv";
import { generateOTP } from "../utils/generateOTP";

dotenv.config();

export async function sendOTP(email: string): Promise<string> {
    const otp = generateOTP();

    const transporter = nodemailer.createTransport({
        service: "gmail",
        auth: {
            user: process.env.GMAIL_USER,
            pass: process.env.GMAIL_PASS,
        },
    });

    const mailOptions = {
        from: process.env.GMAIL_USER,
        to: email,
        subject: "OTP for Blog App",
        html: `
            <div style="font-family: Arial, sans-serif; padding: 20px;">
                <h2 style="color: #333;">Your Verification Code</h2>
                <p>Use the following OTP to complete your login:</p>
                <div 
                    style="font-size: 24px; font-weight: bold; color: #007BFF; margin: 10px 0;">
                        ${otp}
                </div>
            </div>
        `,
    };

    try {
        await transporter.sendMail(mailOptions);
        console.log(`OTP sent to ${email}`);
        return otp;
    } catch (error) {
        console.error("Error sending OTP:", error);
        throw new Error("Failed to send OTP");
    }
}
