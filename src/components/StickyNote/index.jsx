import React, { useState } from 'react';
import Draggable from 'react-draggable';
import { Resizable } from 're-resizable';
import styled from 'styled-components';

const MemoContainer = styled.div`
  background-color: #ffd700;
  border: 1px solid #ffc107;
  border-radius: 10px;
  user-select: none;
  width: 100%;
  height: 100%;
`;

const CloseButton = styled.button`
  position: absolute;
  top: 5px;
  right: 5px;
  background: none;
  border: none;
  font-size: 16px;
  cursor: pointer;
`;

const Textarea = styled.textarea`
  width: 90%;
  height: 90%;
  margin: 5%;
  resize: none;
  border: none;
  background-color: transparent;
  font-family: 'Arial', sans-serif;
  font-size: 14px;
  color: #333;
  outline: none;
`;

const StickyNote = ({ initialPosition, onDelete }) => {
  const [memoText, setMemoText] = useState({
    x: initialPosition.x,
    y: initialPosition.y,
    width: 200,
    height: 200,
    text: '',
  });

  const handleDrag = (e, ui) => {
    setMemoText((prevMemoText) => ({
      ...prevMemoText,
      x: ui.x,
      y: ui.y,
    }));
  };

  const handleResize = (e, direction, ref, delta) => {
    setMemoText((prevMemoText) => ({
      ...prevMemoText,
      width: ref.offsetWidth,
      height: ref.offsetHeight,
    }));
  };

  const handleClose = () => {
    onDelete();
  };

  return (
    <Draggable
      defaultPosition={{ x: initialPosition.x, y: initialPosition.y }}
      onStop={(e, data) => handleDrag(e, data)}
      zIndex={99}
    >
      <Resizable
        size={{ width: memoText.width, height: memoText.height }}
        onResizeStop={(e, direction, ref, delta) =>
          handleResize(e, direction, ref, delta)
        }
        enable={{ top: true, right: true, bottom: true, left: true }}
      >
        <MemoContainer>
          <CloseButton onClick={handleClose}>X</CloseButton>
          <Textarea
            value={memoText.text}
            onChange={(e) =>
              setMemoText((prevMemoText) => ({
                ...prevMemoText,
                text: e.target.value,
              }))
            }
          />
        </MemoContainer>
      </Resizable>
    </Draggable>
  );
};

export default StickyNote;
