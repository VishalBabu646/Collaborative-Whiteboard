import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import RoomJoin from './components/RoomJoin';
import Whiteboard from './components/Whiteboard';
import DrawingCanvas from './components/DrawingCanvas';

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<RoomJoin />} />
        <Route path="/room/:roomId" element={<Whiteboard />} />
      </Routes>
    </Router>
  );
};

export default App;