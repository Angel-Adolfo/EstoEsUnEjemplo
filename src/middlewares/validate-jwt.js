import jwt from 'jsonwebtoken';
import User from '../models/user.js';

export const validateJWT = async (req, res, next) => {
    const token = req.header('x-token');
    if (!token) {
        return res.status(401).json({
            msg: 'No token provided'
        });
    }

    try {
        
        const { uid } = jwt.verify(token, process.env.SECRETORPRIVATEKEY);
        const user = await User.findById(uid);
        if (!user) {
            return res.status(401).json({
                msg: 'Invalid token - user does not exist'
            });
        }

        if (!user.state) {
            return res.status(401).json({
                msg: 'Invalid token - user is inactive'
            });
        }

        req.user = user;
        next();

    } catch (e) {
        console.log(e);
        return res.status(401).json({
            msg: 'Invalid token'
        });
        
    }
}