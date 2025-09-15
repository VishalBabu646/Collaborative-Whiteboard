
import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import http from "http";
import { Server } from "socket.io";
import ConnectionDB from "./db/db.js";
import mainRoute from "./routes/main.routes.js";
import {socketHandlers} from "./socket/socketHandlers.js";

ConnectionDB();
dotenv.config();

const app = express();
const server = http.createServer(app);
const io = new Server(server, {
  cors: {
    origin: '*',
    methods: ['GET', 'POST'],
    credentials:true
  }
});

// Middleware
app.use(cors());
app.use(express.json());

// API Routes

app.use("/api/v1", mainRoute);

// Default Route
app.get("/", (req, res) => {
  res.json({ message: "server is ready" });
});

// Socket.IO setup
socketHandlers(io);

// Start server
server.listen(process.env.PORT, () => {
  console.log(`server is running at ${process.env.PORT}`);
});