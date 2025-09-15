import React, { useEffect, useRef, useState } from 'react';
import { getSocket } from '../socket.js';
import { v4 as uuidv4 } from 'uuid';

const COLORS = ["#FF5733", "#33FF57", "#3357FF", "#FF33A8", "#FFD133"];

const UserCursors = ({ roomId }) => {
  const [cursors, setCursors] = useState({});
  const userIdRef = useRef(uuidv4());
  const colorRef = useRef(COLORS[Math.floor(Math.random() * COLORS.length)]);
  const socketRef = useRef(null); // Use ref to persist socket

  useEffect(() => {
    socketRef.current = getSocket();

    const handleMouseMove = (e) => {
      socketRef.current?.emit('cursor-move', {
        roomId,
        userId: userIdRef.current,
        x: e.clientX,
        y: e.clientY,
        color: colorRef.current,
      });
    };

    window.addEventListener('mousemove', handleMouseMove);

    socketRef.current.on('cursor-update', ({ userId, x, y, color }) => {
      if (userId !== userIdRef.current) {
        setCursors((prev) => ({
          ...prev,
          [userId]: { x, y, color },
        }));
      }
    });

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      socketRef.current.off('cursor-update');
    };
  }, [roomId]);

  return (
    <>
      {Object.entries(cursors).map(([userId, { x, y, color }]) => (
        <div
          key={userId}
          className="pointer-events-none fixed z-50"
          style={{
            left: `${x}px`,
            top: `${y}px`,
            transform: 'translate(-50%, -50%)',
          }}
        >
          <div
            className="w-3 h-3 rounded-full"
            style={{ backgroundColor: color }}
          ></div>
        </div>
      ))}
    </>
  );
};

export default UserCursors;
