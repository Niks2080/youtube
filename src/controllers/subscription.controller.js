import Subscription from "../models/subscription.model.js";
import ApiError from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import asyncHandler from "../utils/asyncHandler.js";

// Create a subscription
const createSubscription = asyncHandler(async (req, res, next) => {
  const { subscriber, channel } = req.body;
  if (!subscriber || !channel) {
    throw new ApiError(400, "Subscriber and channel are required");
  }

  const subscription = new Subscription({ subscriber, channel });
  await subscription.save();
  return res.status(201).json(new ApiResponse(200, "subscribe successfully"));
});

// Get a subscription by ID
const getSubscriptionById = asyncHandler(async (req, res, next) => {
  const subscription = await Subscription.findById(req.params.id).populate(
    "subscriber channel"
  );
  if (!subscription) {
    throw new ApiError(404, "Subscription not found");
  }
  res.status(200).json(new ApiResponse(200, ""));
});

// Update a subscription by ID
const updateSubscriptionById = asyncHandler(async (req, res, next) => {
  const { subscriber, channel } = req.body;
  const subscription = await Subscription.findByIdAndUpdate(
    req.params.id,
    { subscriber, channel },
    { new: true, runValidators: true }
  );
  if (!subscription) {
    throw new ApiError(404, "Subscription not found");
  }
  res.status(200).json(new ApiResponse(200, ""));
});

// Delete a subscription by ID
const deleteSubscriptionById = asyncHandler(async (req, res, next) => {
  const subscription = await Subscription.findByIdAndDelete(req.params.id);
  if (!subscription) {
    throw new ApiError(404, "Subscription not found");
  }
  res.status(204).send();
});

export {
  createSubscription,
  deleteSubscriptionById,
  getSubscriptionById,
  updateSubscriptionById,
};
