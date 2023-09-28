import mongoose from "mongoose";

const Schema = mongoose.Schema;
const ObjectId = Schema.ObjectId;
// defing Schema
const userWorkSchema = new mongoose.Schema({
    userId: { type: ObjectId, ref: 'user' },
    workId: { type: Number, require: true, trim: true },
    title: { type: String, require: true, trim: true },
    work: { type: String, require: true, trim: true },
    createdOn: { type: Date, default: Date.now() },
    deadline: {
        type: Date,
        default: () => new Date(Date.now() + 7 * 24 * 60 * 60 * 1000) // 7 days in milliseconds 
    }
})

// creating Model
const UserWorkModal = mongoose.model("userWork", userWorkSchema)
export default UserWorkModal;