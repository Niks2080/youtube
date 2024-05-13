import { Video } from "../models/video.model.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { ApiError } from "../utils/AppError.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import { uploadOnCloudinary } from "../utils/cloudinary.js";

// Create a new video
const uploadVideo = asyncHandler(async (req, res) => {
  const { thumbnail, title, description, duration } = req.body;
  const videoFiles = req.files.videoFiles[0].path;

  const videoFilePath = req.files?.videoFiles[0]?.path;
  const videoFile = await uploadOnCloudinary(videoFilePath);
  if (!videoFile) {
    throw new ApiError(400, "video file is required");
  }

  const video = await Video.create({
    videoFiles,
    thumbnail,
    title,
    description,
    duration,
    owner: req.body._id,
  });

  return res
    .status(201)
    .json(new ApiResponse(201, video, "Video created successfully"));
});

// Get a video by ID
const getVideo = asyncHandler(async (req, res) => {
  const { videoId } = req.params;

  const video = await Video.findById(videoId).select("-password -refreshToken");

  if (!video) {
    throw new ApiError(404, "Video not found");
  }

  return res
    .status(200)
    .json(new ApiResponse(200, video, "Video retrieved successfully"));
});

// Update a video by ID
const updateVideo = asyncHandler(async (req, res) => {
  const { videoId } = req.params;
  const { videoFile, thumbnail, title, description, duration } = req.body;

  let video = await Video.findById(videoId);

  if (!video) {
    throw new ApiError(404, "Video not found");
  }

  // Update video fields
  video.videoFile = videoFile;
  video.thumbnail = thumbnail;
  video.title = title;
  video.description = description;
  video.duration = duration;

  video = await video.save();

  return res
    .status(200)
    .json(new ApiResponse(200, video, "Video updated successfully"));
});

// Delete a video by ID
const deleteVideo = asyncHandler(async (req, res) => {
  const { videoId } = req.params;

  const video = await Video.findById(videoId);

  if (!video) {
    throw new ApiError(404, "Video not found");
  }

  await video.remove();

  return res
    .status(200)
    .json(new ApiResponse(200, {}, "Video deleted successfully"));
});

//Get list of videos
const getVideos = asyncHandler(async (req, res) => {
  const { page = 1, limit = 10 } = req.query;

  const options = {
    page: parseInt(page, 10),
    limit: parseInt(limit, 10),
    sort: { createdAt: -1 }, // Sort by creation date in descending order
  };

  const videos = await Video.paginate({}, options);

  return res
    .status(200)
    .json(new ApiResponse(200, videos, "Videos retrieved successfully"));
});

export { deleteVideo, getVideo, getVideos, updateVideo, uploadVideo };
