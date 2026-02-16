import User from "../users/user.model.js";
import Role from "../roles/role.model.js";

export const roleValidator = async (role = "") => {
    const existRole = await Role.findOne({role});
    if(!existRole){
        throw new Error(`El rol ${role} no se encuentra registrado en la base de datos`);
    }
}

export const existEmail = async (email = "") => {
    const existEmail = await User.findOne({email});
    if(existEmail){
        throw new Error(`El correo ${email} ya se encuentra registrado`);
    }
}

export const existUserById = async (id) => {
    const existUser = await User.findById(id);
    if(!existUser){
        throw new Error(`El id ${id} no existe`);
    }
}