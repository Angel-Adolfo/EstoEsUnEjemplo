import bcrypt from "bcryptjs";
import User from "../models/User.js";
import { generateJWT } from "../helpers/jwt.js";

export const login = async (req, res) => {
    const { email, password } = req.body;

    try {

        const user = await User.findOne({ email });

        if (!user) {
            return res.status(400).json({
                ok: false,
                msg: 'User not found'
            });
        }

        if (!user.status) {
            return res.status(400).json({
                ok: false,
                msg: 'User is not active'
            });
        }

        const validPasword = bcrypt.compareSync(password, user.password);
        if (!validPasword) {
            return res.status(400).json({
                ok: false,
                msg: 'Invalid password'
            });
        }

        const token = generateJWT(user.id);

        res.json({
            ok: true,
            token
        });

    } catch (error) {
        res.status(500).json({
            ok: false,
            msg: 'Error logging in user'
        });
    }
}