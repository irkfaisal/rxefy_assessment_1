import jwt from 'jsonwebtoken'
import UserModal from '../models/user.js'

export const authenticationCheck = async (req, res, next) => {
    let token;
    const { authorization } = req.headers;
    if (authorization && authorization.startsWith('Bearer')) {
        try {
            // get token from Header Bearer
            token = authorization.split(' ')[1]
            // console.log(token)
            // verify token 
            const { userID } = jwt.verify(token, process.env.JWT_SECRET_KEY)
            // get user data and verify by Id
            req.user = await UserModal.findById(userID).select('-password')
            // console.log(authorization)
            // console.log(req.user)
            next()
        } catch (error) {
            res.send({ "stats": "failed", "message": "Un-authorized user", "status_code": 401 })
        }
    } else {
        res.send({ "stats": "failed", "message": "Autherization failed or token not available", "status_code": 401 })
    }
}
