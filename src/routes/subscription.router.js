// routes/subscriptionRoutes.js
const express = require("express");
const {
  createSubscription,
  getSubscriptionById,
  updateSubscriptionById,
  deleteSubscriptionById,
} = require("../controllers/subscriptionController");

const router = express.Router();

router.post("/create-subscription", createSubscription);
router.get("/get-subscription/:id", getSubscriptionById);
router.put("/update-subscription/:id", updateSubscriptionById);
router.delete("/delete-subscription/:id", deleteSubscriptionById);

module.exports = router;
