import jwt from 'jsonwebtoken';
import { server } from '../config/server.config.js';
import { reg_model } from '../models/reg.model.js';

export const verify_middleware = (req, res, next) => {
    const token = req.headers['x-access-token'];

    if (!token) {
        return res.status(402).send({ 'message': 'No Token Found: Unauthorized Access' });
    }

    jwt.verify(token, server.Secret_code, async (err, decode) => {
        if (err) {
            return res.status(403).send({ 'message': 'Unauthorized user!' });
        }

        const user = await reg_model.findOne({ email: decode.email });
        
        if (!user) {
            return res.status(404).send({ 'message': 'User Does Not Exist!' });
        } else {
            req.user = user;  // Attach the user object to the request
            next();
        }
    });
};

