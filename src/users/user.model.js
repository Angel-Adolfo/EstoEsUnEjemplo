import mongoose from "mongoose";

const UserSchema = mongoose.Schema({
    name: {
        type: String,
        required: [true, "The name is required for the procedure"],
    },
    email: {
        type: String,
        required: [true, "The email is required to follow the procedure"],
        unique: true,
    },
    password: {
        type: String,
        required: [true, "The password is required"],
    },
    img: {
        type: String,
    },
    role: {
        type: String,
        required: true,
        enum: ["ADMIN_ROLE", "USER_ROLE"],
    },
    state: {
        type: Boolean,
        default: true,
    },
    google: {
        type: Boolean,
        default: true,
    },
})

UserSchema.methods.toJSON = function () {
    const { __v, password, _id, ...user } = this.toObject();
    user.uid = _id;
    return user;
}

export default mongoose.model("User", UserSchema);