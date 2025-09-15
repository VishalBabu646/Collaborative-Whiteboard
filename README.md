# Collaborative Whiteboard App

A real-time collaborative whiteboard built with the **MERN** stack and **Socket.IO** for live drawing and cursor sharing between users — without any authentication. Just share a room code and draw together!
---

## 🚀 Project Overview

This project is a whiteboard web application that allows multiple users to join a shared room and draw together in real time. Users can join rooms by entering simple alphanumeric codes, and all drawing and cursor movements are synchronized across connected users instantly.

---

## ⚙️ Tech Stack

| Layer         | Technology         |
|---------------|--------------------|
| Frontend      | React.js           |
| Backend       | Node.js + Express  |
| Database      | MongoDB            |
| Real-time     | Socket.IO          |
| Styling       | Tailwind CSS / CSS |

---

## ✨ Features

### ✅ Room Management
- Enter a 6–8 character alphanumeric room code to join
- No login or registration required
- If room doesn't exist, it gets created dynamically

### ✅ Drawing Features
- Pencil tool (black, red, blue, green)
- Adjustable stroke width with slider
- Clear canvas button
- Smooth line drawing using HTML5 Canvas

### ✅ Real-time Collaboration
- Live drawing sync across all connected users
- Real-time cursor tracking with unique user colors
- Live user count for each room
- All tabs stay in sync 

---

## 🗂️ Folder Structure

project-root/
├── client/ # React frontend
│ ├── src/
│ │ ├── components/
│ │ │ ├── RoomJoin.jsx
│ │ │ ├── Whiteboard.jsx
│ │ │ ├── DrawingCanvas.jsx
│ │ │ ├── Toolbar.jsx
│ │ │ └── UserCursors.jsx
│ │ ├── socket.js
│ │ └── App.js
│ └── package.json
├── server/ # Express + Socket.IO backend
│ ├── models/
│ │ └── Room.js
│ ├── routes/
│ │ └── roomRoutes.js
│ ├── socket/
│ │ └── socketHandlers.js
│ ├── server.js
│ └── package.json
├── README.md

---

##  Setup Instructions

###  Prerequisites

- **Node.js** (v16 or above)
- **MongoDB** (local or Atlas)
- **npm** or **yarn**

----

### ⚙️ Installation Steps

#### 1️⃣ Clone the Repository

```bash
git clone https://github.com/your-username/collab-whiteboard.git
cd collab-whiteboard
```
#### 2️⃣Backend setup

```bash
cd server
npm install
```
Create a .env file inside the server/ directory:<br/>
```env
PORT= 8000 <br/>
MONGODB_URI=your mongoDB connection string
```

#### 3️⃣Frontend Setup

```bash
cd ../client
npm install
```
Create a .env file inside the client/ directory:<br/>
```env
VITE_BACKEND_URL=http://localhost:8000
```

#### Start the frontend:
```bash
npm run dev
```
----

## API Documentation
| Method | Endpoint             | Description           |
| ------ | -------------------- | --------------------- |
| POST   | `/api/rooms/join`    | Join or create a room |
| GET    | `/api/rooms/:roomId` | Get room details      |


Example POST Request
```http
POST /api/rooms/join
Content-Type: application/json

{
  "roomId": "abc123"
}
```
--------

## Socket.IO Events
### Client → Server
- join-room — join a room by roomId
- cursor-move — send mouse position
- draw-start — begin a drawing stroke
- draw-move — continue drawing
- draw-end — finish the stroke
- clear-canvas — clear the canvas for all users
### Server → Client
- user-count — receive updated number of active users
- cursor-update — receive cursor positions from others
- draw-start — begin stroke from another user
- draw-move — receive stroke path data
- draw-end — end stroke
- clear-canvas — clear canvas across all users
  ----
  
## Architecture Overview

```scss
[Client Browser]
   ↓ Socket.IO
[React App - Frontend]
   ↓ API & Socket.IO
[Express Server - Backend]
   ↓
[MongoDB] (optional for persistence)
```
-----

##  Deployment Guide
1. Deploy Backend
 Use platforms like:
- vercel
- Render 
- Railway
- [VPS or Docker Hosting]
- 
Ensure:
- WebSocket transport enabled (transports: ['websocket'])
- CORS properly configured
- MongoDB URI (Atlas recommended) in environment

Example .env for production:

```env

PORT=8000
MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/whiteboard
```
2. Deploy Frontend
Use:
- Vercel
- Netlify

Set  ``` env VITE_BACKEND_URL=https://your-backend-url.com ``` in your .env.production.

3. MongoDB Atlas
- Create a cluster on MongoDB Atlas
- Whitelist your backend IP
- Replace local URI with Atlas URI in .env

-------

## ✅ Status
 - Join/Create room via code
 - Real-time drawing sync
 - Cursor sync
 - Multi-tab sync
 - Clear canvas across all clients
 - Active user tracking
 -----

📝 License
MIT © 2025 Amisha





  
