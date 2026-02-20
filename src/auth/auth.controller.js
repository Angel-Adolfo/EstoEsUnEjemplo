import bcrypt from "bcryptjs";
import User from "../models/User.js";
import { generateJWT } from "../helpers/generate-jwt.js";

export const login = async (req, res) => {
    const { email, password } = req.body;

    try {
        const user = await User.findOne({ email });

        if (!user) {
            return res.status(400).json({
                msg: "The credentials are not correct - email"
            });
        }

        if (!user.state) {
            return res.status(400).json({
                msg: "The credentials are not correct - state: false"
            });
        }

        const validPassword = bcrypt.compareSync(password, user.password);
        if (!validPassword) {
            return res.status(400).json({
                msg: "The credentials are not correct - password"
            });
        }

        const token = await generateJWT(user.id);

        res.status(200).json({
            msg: 'Login OK!!!',
            user,
            token
        });

    } catch (e) {
        console.log(e);
        res.status(500).json({
            msg: 'An error occurred while trying to log in'
        });
    }
}