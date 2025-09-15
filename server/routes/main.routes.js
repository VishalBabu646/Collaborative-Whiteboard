
import express from "express";
import { joinRoom, getRoom } from "../controllers/room.controllers.js";

const router = express.Router();

// @route   POST /api/v1/rooms/join
router.post("/rooms/join", joinRoom);

// @route   GET /api/v1/rooms/:roomId
router.get("/rooms/:roomId", getRoom);

export default router;