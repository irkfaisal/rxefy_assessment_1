import UserModal from "../models/user.js";
import bcrypt from 'bcrypt'
import jwt from "jsonwebtoken";
import transporter from "../config/emailConfig.js";

// JWT Token function
const token = (_id) => {
    return (
        jwt.sign({ userID: _id }, process.env.JWT_SECRET_KEY, { expiresIn: "7d" })
    )
}

// Registration process
export const userRegistration = async (req, res) => {
    const { userHandle, email, password, name, password_conf, tc } = req.body;
    const user = await UserModal.findOne({ email: email })
    const handle = await UserModal.findOne({ userHandle: userHandle })
    if (user) {
        res.send({ "status": "failed_email", message: "Email already exits" })
    } else if (handle) {
        res.send({ "status": "failed_handle", message: "User Handle already exits", })
    } else {
        if (userHandle && name && email && password && tc && password_conf) {
            if (password === password_conf) {
                try {
                    const salt = await bcrypt.genSalt(12)
                    const hashPassword = await bcrypt.hash(password, salt)
                    const userDoc = new UserModal({
                        name: name,
                        userHandle: userHandle,
                        email: email,
                        password: hashPassword,
                        tc: tc
                    })
                    await userDoc.save()
                    const saved_user = await UserModal.findOne({ email: email })

                    res.status(201).send({ "status": "success", "message": "Registration successfull", "token": token(saved_user?._id) })
                    // Creating JWT token
                    // const token = jwt.sign({ userID: saved_user?._id }, process.env.JWT_SECRET_KEY, { expiresIn: "7d" })
                } catch (error) {
                    console.log(error)
                    res.send({ "status": "failed", "message": "Registration failed" })
                }
            } else {
                res.send({ "status": "failed", message: "confirm password not matched" })
            }
        } else {
            res.send({ "status": "failed", message: "all fields are required" })
        }
    }
}

// Login Registration
export const userLogin = async (req, res) => {
    const { email, password } = req.body;
    if (email && password) {
        const user = await UserModal.findOne({ email: email })
        // console.log(user, "user")
        if (user) {
            const isMatch = await bcrypt.compare(password, user.password)
            if ((email === user.email) && isMatch) {
                res.send({ "status": "success", "message": "Login successfull", "status_code": 200, "token": token(user?._id) })
                // JWT Token
                // const token = jwt.sign({ userID: user?._id }, process.env.JWT_SECRET_KEY, { expiresIn: "7d" })
            } else {
                res.send({ "status": "failed", "message": "Email or Password does not match", "status_code": 401 })
            }
        } else {
            res.send({ "status": "failed", "message": "email not found", "status_code": 401 })
        }
    } else {
        res.send({ "status": "failed", "message": "All field required", "status_code": 401 })
    }
}

// Change password while login
export const changePassword = async (req, res) => {
    const { password, password_conf } = req.body;

    if (password && password_conf) {
        if (password === password_conf) {
            const salt = await bcrypt.genSalt(12)
            const newHashPassword = await bcrypt.hash(password, salt)
            // updating password only after authentication
            // console.log(req.user._id)
            await UserModal.findByIdAndUpdate(req.user._id, { $set: { password: newHashPassword } })
            res.send({ "status": "success", "message": "password changed successfully", "status_code": 200 })
        } else {
            res.send({ "status": "failed", "message": "confirm password does not match", "status_code": 401 })
        }
    } else {
        res.send({ "status": "failed", "message": "All field required", "status_code": 401 })
    }
}

// Get Logged in user's data
export const loggedUser = async (req, res) => {
    res.send({ "user": req.user })
}

// Send email for Forget password
export const forgetPasswod = async (req, res) => {
    const { email } = req.body;
    if (email) {
        const user = await UserModal.findOne({ email: email })
        if (user) {
            const secret_key = user?.id + process.env.JWT_SECRET_KEY;
            const token = jwt.sign({ userID: user?._id }, secret_key, { expiresIn: "15m" })
            const link = `http://localhost:5173/api/user/resetpassword/${user?._id}/${token}`
            console.log(link, "link")
            // send email
            let info = await transporter.sendMail({
                from: process.env.EMAIL_FROM,
                to: user.email,
                subject: "MyMernApp Password Reset Link",
                html: `<a href=${link}>Click Here</a> to Reset Your Password`
            })
            res.send({ "status": "success", "message": "Email sent to your email", "status_code": 200 })
        } else {
            res.send({ "status": "failed", "message": "Email does not exits", "status_code": 401 })
        }
    } else {
        res.send({ "status": "failed", "message": "Please provide email", "status_code": 401 })
    }
}

// Reset Email after email sent
export const resetPassword = async (req, res) => {
    const { password, password_conf } = req.body;
    const { id, token } = req.params;
    const user = await UserModal.findById(id)
    const new_secret_key = user?._id + process.env.JWT_SECRET_KEY;
    try {
        jwt.verify(token, new_secret_key)
        if (password && password_conf) {
            if (password === password_conf) {
                const salt = await bcrypt.genSalt(12)
                const newHashPassword = await bcrypt.hash(password, salt)
                await UserModal.findByIdAndUpdate(user?._id, { $set: { password: newHashPassword } })
                res.send({ "status": "success", "message": "password changed successfully", "status_code": 200 })
            } else {
                res.send({ "status": "failed", "message": "confirm password does not match", "status_code": 401 })
            }
        } else {
            res.send({ "status": "failed", "message": "Please provide all fields", "status_code": 401 })
        }
    } catch (error) {
        res.send({ "status": "failed", "message": "user not verified", "status_code": 401 })
    }
} 