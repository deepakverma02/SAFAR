import bcrypt from 'bcryptjs'
import { reg_model } from '../models/reg.model.js'


export const register = async (req, res) => {
    const request_body = req.body

    const reg_user_object = {
        name: request_body.name,
        email: request_body.email,
        password: bcrypt.hashSync(request_body.password, 8),
        mobNum : request_body.number
    }

    try {

        const user_create = await reg_model.create(reg_user_object)
        const response_create = {
            name: user_create.name,
            email: user_create.email,
        }
        res.status(201).send(response_create)

    }

    catch (error) {
        console.log("Error While regestering the user !", error)
        res.status(500).send({
            message: 'Error occur While regestring the user !, Check with the Credentials'
        })
    }


}