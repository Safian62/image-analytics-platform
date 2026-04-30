import express from "express";
import { filterByDate, getTotalImages, groupByLabel, uploadImage } from "../controllers/image.controller";
import { upload } from "../middleware/multer";
import { isAuthenticated } from "../middleware/auth.middleware";

const imageRouter = express.Router();

imageRouter.post("/upload", isAuthenticated, upload.single("image"), uploadImage);
imageRouter.get("/total", isAuthenticated, getTotalImages);
imageRouter.get("/group", isAuthenticated, groupByLabel);
imageRouter.get("/filter", isAuthenticated, filterByDate);

export default imageRouter;