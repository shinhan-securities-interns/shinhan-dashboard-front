import React, { useState, useEffect } from 'react';
import { axiosInstance } from '../../apis';
import { Area, Input, MiniHeader, StickyNote } from '../index';
import {
  Container,
  Menu,
  RightWrapper,
  AttachWrapper,
  Button,
  AddButton,
  MemoWrapper,
} from './styled';

const Board = () => {
  const [draggedItem, setDraggedItem] = useState(null);
  const [stickers, setStickers] = useState([]);
  const [areas, setAreas] = useState({
    areas1: '',
    areas2: '',
    areas3: '',
    areas4: '',
  });
  const btnId = { btn1: '📊', btn2: '📈', btn3: '3', btn4: '4' };

  const handleDragStart = (event, title) => {
    setDraggedItem(title);
    event.dataTransfer.setData('text/plain', title);
  };

  const handleDragOver = (event) => {
    event.preventDefault();
  };

  const handleDrop = (event, areaId) => {
    event.preventDefault();

    if (areaId) {
      setAreas((prevAreas) => ({
        ...prevAreas,
        [areaId]: draggedItem,
      }));

      setDraggedItem(null);
    }
  };

  const handleAddSticker = () => {
    const newStickers = [...stickers, { x: 100, y: 100 }];
    setStickers(newStickers);
  };

  const handleDeleteSticker = (index) => {
    const updatedStickers = stickers.filter((_, i) => i !== index);
    setStickers(updatedStickers);
  };

  const getContent = async () => {
    axiosInstance
      .get('/total_yearly/quarter/005930')
      .then((response) => {
        console.log(response);
      })
      .catch((e) => {
        console.log(e);
      });
  };

  useEffect(() => {
    getContent();
  }, []);

  return (
    <Container>
      <Menu>
        <Input />
        {Object.keys(btnId).map((id) => (
          <Button
            key={id}
            draggable
            onDragStart={(e) => handleDragStart(e, btnId[id])}
          >
            {btnId[id]}
          </Button>
        ))}
      </Menu>
      <RightWrapper>
        <MiniHeader />
        <MemoWrapper>
          {stickers.map((position, index) => (
            <StickyNote
              key={index}
              initialPosition={position}
              onDelete={() => handleDeleteSticker(index)}
            />
          ))}
        </MemoWrapper>
        <AddButton onClick={handleAddSticker}>➕</AddButton>
        <AttachWrapper>
          {Object.keys(areas).map((area) => (
            <Area
              overFnc={handleDragOver}
              dropFnc={(e) => handleDrop(e, area)}
              key={area}
              title={areas[area]}
              id={area}
            />
          ))}
        </AttachWrapper>
      </RightWrapper>
    </Container>
  );
};

export default Board;
