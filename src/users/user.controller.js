import { response, request } from "express";
import bcrypt from "bcryptjs";
import User from "./user.model.js";

export const userGet = async (req = request, res = response) => {
    const {limit, from} = req.query;
    const query = {state: true};
    const [total, users] = await Promise.all([
        User.countDocuments(query),
        User.find(query)
        .skip(Number(from))
        .limit(Number(limit))
    ])

    res.status(200).json({
        total,
        users
    });
};

export const userPost = async (req, res) => {
    const {name, email, password, role} = req.body;
    const user = new User({name, email, password, role});

    const salt = bcrypt.genSaltSync();
    user.password = bcrypt.hashSync(password, salt);

    await user.save();

    res.status(201).json({
        user
    });
};

export const userPut = async (req, res) => {
    const {id} = req.params;
    const {_id, password, google, email, ...rest} = req.body;

    if(password){
        const salt = bcrypt.genSaltSync();
        rest.password = bcrypt.hashSync(password, salt);
    }

    await User.findByIdAndUpdate(id, rest);

    const user= await User.findOne({_id: id});

    res.status(200).json({
        msg: "Usuario Actualizado con éxito",
        user
    }); 
}
