import { NextFunction, Request, Response } from "express";
import { CatchAsyncError } from "../middleware/catchAsyncError";
import User from "../models/user.model";
import ErrorHandler from "../utils/errorHandler";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";



interface IRegistrationBody {
    name: string,
    email: string,
    password: string,
}

interface ILoginRequest {
    email: string,
    password: string
}

export const registerUser = CatchAsyncError(async (req: Request, res: Response, next: NextFunction) => {
    try {
        const { name, email, password } = req.body;
        const isUserExists = await User.findOne({ email });
        if (isUserExists) {
            return next(new ErrorHandler('User already Exists', 400))
        }
        const hashPassword = await bcrypt.hash(password, 10)
        const user: IRegistrationBody = {
            name,
            email,
            password: hashPassword
        }
        await User.create(user)

        res.status(201).json({
            success: true,
            message: 'User created successfully'
        })

    } catch (error: any) {
        return next(new ErrorHandler(error.message, 400))

    }
})


export const loginUser = CatchAsyncError(async (req: Request, res: Response, next: NextFunction) => {

    try {
        const { email, password } = req.body as ILoginRequest;
        if (!email || !password) {
            return next(new ErrorHandler('Please enter email and password.', 400))
        }

        const user = await User.findOne({ email }).select("+password")

        if (!user) {
            return next(new ErrorHandler('Invalid email or password', 404))
        }
        const isPasswordMatch = await user.comparePassword(password)
        if (!isPasswordMatch) {
            return next(new ErrorHandler('Invalid email or password', 400))
        }

        const token = jwt.sign(
            { userId: user._id },
            process.env.JWT_SECRET as string,
            { expiresIn: "1d" }
        );
        res.cookie("token", token, {
            httpOnly: true,
            secure: false,
            sameSite: "lax",
            maxAge: 24 * 60 * 60 * 1000,
        });

        res.status(200).json({
            success: true,
            message: "Login successful",
            token
        })
    } catch (error: any) {
        return next(new ErrorHandler(error.message, 400))

    }
})


export const getMe = CatchAsyncError(async (req: any, res: Response) => {
    const user = await User.findById(req.user.userId).select("-password");

    res.status(200).json({
        success: true,
        user,
    });
});