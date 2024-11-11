import React, { useState } from 'react';
import Draggable from 'react-draggable';

function ResizableSquare() {
  const [size, setSize] = useState(100); // Initial size of the square (width and height)
  const [topPosition, setTopPosition] = useState(100); // Top position of the square
  const [leftPosition, setLeftPosition] = useState(100); // Left position of the square
  const [height, setHeight] = useState(100); // Height of the square
  const [isResizing, setIsResizing] = useState(false);
  const [resizeDirection, setResizeDirection] = useState(null);

  const handleMouseDown = (direction) => (e) => {
    e.stopPropagation();
    setIsResizing(true);
    setResizeDirection(direction);
  };

  const handleMouseMove = (e) => {
    if (!isResizing) return;

    const deltaX = e.movementX;
    const deltaY = e.movementY;

    // For top-center and bottom-center handlers (resize height only)
    if (resizeDirection === 'top-center') {
      const newHeight = height - deltaY;
      setHeight(newHeight > 20 ? newHeight : 20); // Adjust height and prevent it from going too small
      setTopPosition(topPosition + deltaY); // Move the square up or down
    } else if (resizeDirection === 'bottom-center') {
      const newHeight = height + deltaY;
      setHeight(newHeight > 20 ? newHeight : 20);
    }

    // For left-center and right-center handlers (resize width only)
    else if (resizeDirection === 'left-center') {
      const newWidth = size - deltaX;
      setSize(newWidth > 20 ? newWidth : 20); // Adjust width
      setLeftPosition(leftPosition + deltaX); // Move the square left or right
    } else if (resizeDirection === 'right-center') {
      const newWidth = size + deltaX;
      setSize(newWidth > 20 ? newWidth : 20);
    }

    // For corner handlers (resize width and height simultaneously)
    else if (resizeDirection === 'top-left') {
      const newSize = size - deltaX;
      setSize(newSize > 20 ? newSize : 20); // Adjust both width and height
      setHeight(height - deltaY); // Adjust height
      setTopPosition(topPosition + deltaY); // Move the square up
      setLeftPosition(leftPosition + deltaX); // Move the square left
    } else if (resizeDirection === 'top-right') {
      const newSize = size + deltaX;
      setSize(newSize > 20 ? newSize : 20); // Adjust both width and height
      setHeight(height - deltaY); // Adjust height
      setTopPosition(topPosition + deltaY); // Move the square up
    } else if (resizeDirection === 'bottom-left') {
      const newSize = size - deltaX;
      setSize(newSize > 20 ? newSize : 20); // Adjust both width and height
      setHeight(height + deltaY); // Adjust height
      setTopPosition(topPosition + deltaY); // Move the square down
      setLeftPosition(leftPosition + deltaX); // Move the square left
    } else if (resizeDirection === 'bottom-right') {
      const newSize = size + deltaX;
      setSize(newSize > 20 ? newSize : 20); // Adjust both width and height
      setHeight(height + deltaY); // Adjust height
      setTopPosition(topPosition); // Keep the top-left corner fixed
      setLeftPosition(leftPosition); // Keep the top-left corner fixed
    }
  };

  const handleMouseUp = () => {
    setIsResizing(false);
    setResizeDirection(null);
  };

  return (
    <div
      style={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        height: '100vh',
      }}
      onMouseMove={handleMouseMove}
      onMouseUp={handleMouseUp}
    >
      {/* Disable dragging when resizing */}
      <Draggable bounds="parent" disabled={isResizing}>
        <div
          style={{
            width: `${size}px`,
            height: `${height}px`,
            backgroundColor: 'blue',
            position: 'absolute',
            top: `${topPosition}px`,
            left: `${leftPosition}px`,
            cursor: isResizing ? 'ns-resize' : 'move',
          }}
        >
          {/* Corner resizing handles */}
          <div
            onMouseDown={handleMouseDown('top-left')}
            style={{
              position: 'absolute',
              width: '10px',
              height: '10px',
              backgroundColor: 'white',
              border: '2px solid black',
              top: '-5px',
              left: '-5px',
              cursor: 'nwse-resize',
            }}
          />
          <div
            onMouseDown={handleMouseDown('top-right')}
            style={{
              position: 'absolute',
              width: '10px',
              height: '10px',
              backgroundColor: 'white',
              border: '2px solid black',
              top: '-5px',
              right: '-5px',
              cursor: 'nesw-resize',
            }}
          />
          <div
            onMouseDown={handleMouseDown('bottom-left')}
            style={{
              position: 'absolute',
              width: '10px',
              height: '10px',
              backgroundColor: 'white',
              border: '2px solid black',
              bottom: '-5px',
              left: '-5px',
              cursor: 'nesw-resize',
            }}
          />
          <div
            onMouseDown={handleMouseDown('bottom-right')}
            style={{
              position: 'absolute',
              width: '10px',
              height: '10px',
              backgroundColor: 'white',
              border: '2px solid black',
              bottom: '-5px',
              right: '-5px',
              cursor: 'nwse-resize',
            }}
          />

          {/* Edge center resizing handles */}
          <div
            onMouseDown={handleMouseDown('top-center')}
            style={{
              position: 'absolute',
              width: '10px',
              height: '10px',
              backgroundColor: 'white',
              border: '2px solid black',
              top: '-5px',
              left: '50%',
              transform: 'translateX(-50%)',
              cursor: 'ns-resize',
            }}
          />
          <div
            onMouseDown={handleMouseDown('left-center')}
            style={{
              position: 'absolute',
              width: '10px',
              height: '10px',
              backgroundColor: 'white',
              border: '2px solid black',
              top: '50%',
              left: '-5px',
              transform: 'translateY(-50%)',
              cursor: 'ew-resize',
            }}
          />
          <div
            onMouseDown={handleMouseDown('right-center')}
            style={{
              position: 'absolute',
              width: '10px',
              height: '10px',
              backgroundColor: 'white',
              border: '2px solid black',
              top: '50%',
              right: '-5px',
              transform: 'translateY(-50%)',
              cursor: 'ew-resize',
            }}
          />
          <div
            onMouseDown={handleMouseDown('bottom-center')}
            style={{
              position: 'absolute',
              width: '10px',
              height: '10px',
              backgroundColor: 'white',
              border: '2px solid black',
              bottom: '-5px',
              left: '50%',
              transform: 'translateX(-50%)',
              cursor: 'ns-resize',
            }}
          />
        </div>
      </Draggable>
    </div>
  );
}

export default ResizableSquare;
