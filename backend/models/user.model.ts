import mongoose, { Document, Schema } from "mongoose";
import bcrypt from "bcryptjs";

const emailRegexPattern: RegExp = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
export interface IUser extends Document {
    name: string,
    email: string,
    password: string,
    comparePassword: (password: string) => Promise<boolean>;

}

const UserSchema: Schema<IUser> = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
        validate: {
            validator: function (value: string) {
                return emailRegexPattern.test(value)
            },
            message: "Please enter a validate email."
        },
        unique: true,
    },
    password: {
        type: String,
        minlength: [6, 'Password must be at least 6 characters'],
        required: true,
        select: false
    },
},
    { timestamps: true }
);

UserSchema.methods.comparePassword = async function (enteredPassword: string) {
    return await bcrypt.compare(enteredPassword, this.password);
};
const User = mongoose.model("User", UserSchema);

export default User;