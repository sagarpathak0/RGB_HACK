import React, { useState, useEffect } from "react";
import Draggable from "react-draggable";
import { FaEdit, FaEye, FaTrash } from "react-icons/fa";
import Image from 'next/image';

const Note = ({ id, title, content, position, onDragEnd, onDelete, update, color, group, onClick }) => {
  const [currentPosition, setPosition] = useState(position);

  useEffect(() => {
    setPosition(position);
  }, [id, position]);

  const handleStop = (e,data) => {
    const newPosition = { x: data.x, y: data.y };
    // console.log(newPosition);
    setPosition(newPosition);
    if (onDragEnd) onDragEnd(id, newPosition);
  };

  const handleEdit = () => {
    onClick({ type: 'edit', note: { id, title, content, color, group } });
  };

  const handleView = () => {
    onClick({ type: 'view', note: { id, title, content } });
  };

  return (
    <Draggable position={currentPosition} onStop={handleStop}>
      <div
        className="note p-4 border rounded shadow relative transition-transform transform hover:scale-105 flexx flex-col item-end"
        style={{ backgroundColor: color, width: '200px', height: '200px', overflow: 'hidden' }}
      >
        <div className="bg-transparent p-2 border-2 border-red-500 w-full h-full overflow-hidden " >
          
          <h3 className="text-lg font-bold">{title}</h3>
          <p className="">{content}</p>
          <div className="absolute top-0 right-0 mt-2 mr-2 space-x-2">
            <button onClick={handleEdit} className="text-blue-600">
              <FaEdit />
            </button>
            {/* <button onClick={handleView} className="text-blue-600">
              <FaEye />
            </button> */}
            <button onClick={() => onDelete(id)} className="text-red-600">
              <FaTrash />
            </button>
          </div>
        </div >
        <div>
          <Image src='/assets/animal/rabbit.svg' width={50} height={50} alt='panda' className="absolute right-0 bottom-2 background-white" />
        </div>
      </div>

    </Draggable>
  );
};

export default Note;
