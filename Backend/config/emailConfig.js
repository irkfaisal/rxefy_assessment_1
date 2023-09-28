import dotenv from 'dotenv'
dotenv.config()
import nodemailer from 'nodemailer'

let transporter = nodemailer.createTransport({
    host: process.env.EMAIL_HOST,
    port: process.env.EMAIL_PORT,
    secure: false, // true for 465, false for other ports
    auth: {
        user: process.env.EMAIL_USER, // Admin Gmail ID
        pass: process.env.EMAIL_PASS, // Admin Gmail Password
    },
})

export default transporter;







// PORT = 8000
// DATABASE_URL = "mongodb://0.0.0.0:27017/"
// JWT_SECRET_KEY = "o5a2v3e9b6s5h41s5r7d2xyz"

// START_APP = "npm run dev"

// EMAIL_HOST = 'smtp.gmail.com'
// EMAIL_PORT = 587
// EMAIL_USER = 'irkfaisal@gmail.com'
// EMAIL_PASS = ''
// EMAIL_FROM = 'irkfaisal@gmail.com'