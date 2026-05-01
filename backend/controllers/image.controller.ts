import { Response, NextFunction } from "express";
import cloudinary from "../config/cloudinary";
import Image from "../models/image.model";
import streamifier from "streamifier";
import { CatchAsyncError } from "../middleware/catchAsyncError";
import ErrorHandler from "../utils/errorHandler";
import { AuthenticatedRequest } from "../types/express";
import mongoose from "mongoose";
export const uploadImage = CatchAsyncError(async (req: AuthenticatedRequest, res: Response, next: NextFunction) => {
    try {
        const file = req.file;
        const { label } = req.body;

        if (!file) {
            return next(new ErrorHandler("No file uploaded", 400))

        }

        const uploadFromBuffer = () => {
            return new Promise((resolve, reject) => {
                const stream = cloudinary.uploader.upload_stream(
                    { folder: "images" },
                    (error, result) => {
                        if (error) return reject(error);
                        resolve(result);
                    }
                );

                streamifier.createReadStream(file.buffer).pipe(stream);
            });
        };

        const result: any = await uploadFromBuffer();

        const image = await Image.create({
            url: result.secure_url,
            size: file.size,
            user: req.user?.userId,
            label: label
        });

        res.status(201).json({
            success: true,
            image,
        });
    } catch (error: any) {
        return next(new ErrorHandler(error.message, 400))
    }
});


export const getAllImages = CatchAsyncError(
    async (req: AuthenticatedRequest, res: Response, next: NextFunction) => {
        try {
            const page = parseInt(req.query.page as string) || 1;
            const limit = parseInt(req.query.limit as string) || 10;

            const skip = (page - 1) * limit;

            const images = await Image.find({ user: req.user?.userId })
                .sort({ createdAt: -1 })
                .skip(skip)
                .limit(limit);

            const total = await Image.countDocuments({
                user: req.user?.userId,
            });

            res.status(200).json({
                success: true,
                images,
                pagination: {
                    total,
                    page,
                    limit,
                    totalPages: Math.ceil(total / limit),
                    hasNextPage: page * limit < total,
                    hasPrevPage: page > 1,
                },
            });
        } catch (error: any) {
            return next(new ErrorHandler(error.message, 400));
        }
    }
);
export const getTotalImages = CatchAsyncError(async (req: AuthenticatedRequest, res: Response, next: NextFunction) => {
    try {
        const count = await Image.countDocuments({ user: req.user?.userId });

        res.status(200).json({
            success: true,
            totalImages: count,
        });
    } catch (error: any) {
        return next(new ErrorHandler(error.message, 400))
    }
})

export const groupByLabel = CatchAsyncError(
    async (req: AuthenticatedRequest, res: Response, next: NextFunction) => {
        try {
            const data = await Image.aggregate([
                {
                    $match: {
                        user: new mongoose.Types.ObjectId(req.user!.userId),
                    },
                },
                {
                    $group: {
                        _id: "$label",
                        count: { $sum: 1 },
                    },
                },
                {
                    $sort: { count: -1 },
                },
            ]);

            res.status(200).json({
                success: true,
                data,
            });
        } catch (error: any) {
            return next(new ErrorHandler(error.message, 400));
        }
    }
);

export const filterByDate = CatchAsyncError(async (req: AuthenticatedRequest, res: Response, next: NextFunction) => {
    try {
        const { startDate, endDate } = req.query;
        if (!startDate || !endDate) {
            return next(new ErrorHandler("startDate and endDate are required", 400));
        }
        const startStr = (typeof startDate === 'string' ? startDate : Array.isArray(startDate) ? startDate[0] : '') as string;
        const endStr = (typeof endDate === 'string' ? endDate : Array.isArray(endDate) ? endDate[0] : '') as string;

        const images = await Image.find({
            user: req.user?.userId,
            createdAt: {
                $gte: new Date(startStr as string),
                $lte: new Date(endStr as string),
            },
        });

        res.status(200).json({
            success: true,
            images,
        });
    } catch (error: any) {
        return next(new ErrorHandler(error.message, 400))
    }
})