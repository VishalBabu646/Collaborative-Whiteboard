import React from 'react';

const Toolbar = ({ color, setColor, strokeWidth, setStrokeWidth, onClear, tool, setTool }) => {
  return (
    <div className="flex items-center gap-4 bg-white p-2 shadow-md w-full justify-center">
      {/* Tool Buttons */}
      <button
        onClick={() => setTool('pencil')}
        className={`px-3 py-1 rounded ${tool === 'pencil' ? 'bg-blue-500 text-white' : 'bg-gray-300'}`}
      >
        ✏️ Pencil
      </button>

      <button
        onClick={() => setTool('eraser')}
        className={`px-3 py-1 rounded ${tool === 'eraser' ? 'bg-blue-500 text-white' : 'bg-gray-300 '}`}
      >
        🧽 Eraser
      </button>

      {/* Color Picker */}
      <div className="flex gap-2">
        {["black", "red", "blue", "green"].map((c) => (
          <button
            key={c}
            className={`w-6 h-6 rounded-full border-2 ${color === c ? "border-gray-800" : "border-white"}`}
            style={{ backgroundColor: c }}
            onClick={() => setColor(c)}
          ></button>
        ))}
      </div>

      {/* Stroke Width Slider */}
      <div className="flex items-center gap-2">
        <label className="text-sm font-medium">Stroke</label>
        <input
          type="range"
          min="1"
          max="20"
          value={strokeWidth}
          onChange={(e) => setStrokeWidth(parseInt(e.target.value))}
          className="w-32"
        />
      </div>

      {/* Clear Button */}
      <button
        className="px-3 py-1 bg-teal-500 text-white rounded hover:bg-teal-600 transition"
        onClick={onClear}
      >
        Clear Canvas
      </button>
    </div>
  );
};

export default Toolbar;
