import { Room } from "../models/room.models.js";

// Join or Create Room
export const joinRoom = async (req, res) => {
  const { roomId } = req.body;

  if (!roomId || typeof roomId !== 'string') {
    return res.status(400).json({ error: 'Invalid roomId' });
  }

  try {
    let room = await Room.findOne({ roomId });
    if (!room) {
      room = await Room.create({ roomId });
    }
    return res.status(200).json({ success: true, room });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ error: 'Server error' });
  }
};

// Get Room Info
export const getRoom = async (req, res) => {
  const { roomId } = req.params;

  try {
    const room = await Room.findOne({ roomId });
    if (!room) return res.status(404).json({ error: 'Room not found' });
    return res.status(200).json({ room });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ error: 'Server error' });
  }
};
