import UserWorkModal from "../models/userWork.js";
import UserModal from "../models/user.js";
import transporter from "../config/emailConfig.js";


// add work
export const addWork = async (req, res) => {
    const { title, work, workId, assignedTo, createdOn, deadline, assignedBy } = req.body;
    const workid = await UserWorkModal.findOne({ workId })
    const user = await UserModal.findOne({ userHandle: assignedTo });
    console.log(req.body)
    if (workid) {
        res.send({ "status": "failed", "failedType": "workId", "message": "WorkId already created & email sent to assigned user handle" })
    } else if (!user) {
        res.send({ status: 'failed', failed_type: 'userHandle', message: 'User handle does not found' });
    } else {
        if (title && work && workId && assignedTo) {
            try {
                const userWorkDoc = new UserWorkModal({
                    workId,
                    title,
                    work,
                    assignedTo,
                    assignedBy,
                    createdOn,
                    deadline
                })
                await userWorkDoc.save() // work saved in database
                res.status(201).send({ "status": "success", "message": "Work added successfull" })
                // send work mail to userHandle(assignedTo)
                const userEmail = user.email;
                let info = await transporter.sendMail({
                    from: process.env.EMAIL_FROM,
                    to: userEmail,
                    subject: `Work assigned`,
                    html: `You have been assigned a work having work id ${workId}`
                })
                console.log('User email:', userEmail);
            } catch (error) {
                console.log(error)
                res.send({ "status": "failed", "failed_type": "addwork", "message": "something went wrong" })
            }
        } else {
            res.send({ "status": "failed", "failed_type": "inputfield", "message": "All fields are required" })

        }
    }
}

// get all work
export const getAllWork = async (req, res) => {
    const allWorks = await UserWorkModal.find({})
    res.send({ "status": "success", "message": "work details ", "data": allWorks })
}

// get work by workId
export const getWorkById = async (req, res) => {

}