import mongoose from "mongoose";

// defing Schema
const userSchema = new mongoose.Schema({
    userHandle: { type: String, required: true, trim: true },
    email: { type: String, required: true, trim: true },
    name: { type: String, required: true, trim: true },
    password: { type: String, required: true, trim: true },
    tc: { type: Boolean, required: true }
})

// creating Model
const UserModal = mongoose.model("user", userSchema)
export default UserModal;