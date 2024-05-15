import { Router } from "express";
import {
  deleteVideo,
  getVideo,
  getVideos,
  updateVideo,
  uploadVideo,
} from "../controllers/video.controller.js";
import { upload } from "../middlewares/multer.middleware.js";

const router = Router();
router.route("/upload-video").post(
  upload.fields([
    {
      name: "videoFiles",
      maxCount: 1,
    },
  ]),
  uploadVideo
);

// Route definitions

router.route("/get-videos").get(getVideos);
router.route("/get-video/:videoId").get(getVideo);
router.route("/update-video/:videoId").get(updateVideo);
router.route("/delete-video/:videoId").get(deleteVideo);
router.delete("/:videoId", deleteVideo);

export default router;
