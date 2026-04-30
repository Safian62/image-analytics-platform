import { Request, Response, NextFunction } from "express";
import cloudinary from "../config/cloudinary";
import Image from "../models/image.model";
import streamifier from "streamifier";
import { CatchAsyncError } from "../middleware/catchAsyncError";

export const uploadImage = CatchAsyncError(async (req: any, res: Response, next: NextFunction) => {
    try {
        const file = req.file;
        const { label } = req.body;

        if (!file) {
            return res.status(400).json({ message: "No file uploaded" });
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
            user: req.user.userId,
            label: label
        });

        res.status(201).json({
            success: true,
            image,
        });
    } catch (error) {
        next(error);
    }
});

export const getTotalImages = CatchAsyncError(async (req: any, res: any, next: any) => {
    try {
        const count = await Image.countDocuments({ user: req.user.userId });

        res.status(200).json({
            success: true,
            totalImages: count,
        });
    } catch (error) {
        next(error);
    }
})

export const groupByLabel = CatchAsyncError(async (req: any, res: any, next: any) => {
    try {
        const data = await Image.aggregate([
            { $match: { user: req.user.userId } },
            {
                $group: {
                    _id: "$label",
                    count: { $sum: 1 },
                },
            },
        ]);

        res.status(200).json({
            success: true,
            data,
        });
    } catch (error) {
        next(error);
    }
})

export const filterByDate = CatchAsyncError(async (req: any, res: any, next: any) => {
    try {
        const { startDate, endDate } = req.query;

        const images = await Image.find({
            user: req.user.userId,
            createdAt: {
                $gte: new Date(startDate),
                $lte: new Date(endDate),
            },
        });

        res.status(200).json({
            success: true,
            images,
        });
    } catch (error) {
        next(error);
    }
})