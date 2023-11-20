import React, { useState, useEffect } from 'react';
import { useRecoilValue } from 'recoil';
import { stockItemsState } from '../../store/atoms';
import { axiosInstance } from '../../apis';
import { Area, Input, MiniHeader, StickyNote } from '../index';
import {
  Container,
  Menu,
  ItemContainer,
  Item,
  RightWrapper,
  AttachWrapper,
  Button,
  ButtonWrapper,
  AddButton,
  MemoWrapper,
} from './styled';

const Board = () => {
  const stockItems = useRecoilValue(stockItemsState);
  const [stickers, setStickers] = useState([]);
  const [stock, setStock] = useState({});
  const [areas, setAreas] = useState({
    areas1: '',
    areas2: '',
    areas3: '',
    areas4: '',
  });
  const [itemClicked, setItemClicked] = useState(false);

  const btns = [
    { id: 'btn1', icon: '📜', label: '종목 정보' },
    { id: 'btn2', icon: '📈', label: '주식 차트' },
    { id: 'btn3', icon: '📋', label: '재무제표' },
    { id: 'btn4', icon: '📊', label: '매출액 / 영업이익 차트' },
    { id: 'btn5', icon: '📊', label: '당기순이익 / PER 차트' },
    { id: 'btn6', icon: '🗨️', label: '종목토론방' },
    { id: 'btn7', icon: '📝', label: '종목 평가 점수' },
  ];

  const handleDragStart = (event, { id, icon, label }) => {
    event.dataTransfer.setData('text/plain', `${id}|${icon}|${label}`);
  };

  const handleDragOver = (event) => {
    event.preventDefault();
  };

  const handleDrop = (event, areaId) => {
    event.preventDefault();

    if (areaId) {
      const data = event.dataTransfer.getData('text/plain').split('|');
      const draggedItemId = data[0];
      const draggedItemIcon = data[1];
      const draggedItemLabel = data[2];

      setAreas((prevAreas) => ({
        ...prevAreas,
        [areaId]: {
          id: draggedItemId,
          icon: draggedItemIcon,
          label: draggedItemLabel,
          stock: stock,
        },
      }));
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
    try {
      const response = await axiosInstance.get(
        `http://${process.env.REACT_APP_INDI_URL}/indi-stock/035720/score`,
        {
          headers: {
            'ngrok-skip-browser-warning': 'value',
          },
        }
      );
      console.log(response);
    } catch (error) {
      console.error(error);
    }
  };

  const handleItemClick = (item) => {
    setItemClicked(true);
    setStock({
      name: item._source.stockName,
      code: item._source.stockCode,
    });
  };

  useEffect(() => {
    getContent();
  }, []);

  useEffect(() => {
    setItemClicked(false);
    console.log('Recoil 스테이트 값 변경:', stockItems);
  }, [stockItems]);

  return (
    <Container>
      <Menu>
        <Input />
        {!itemClicked && (
          <ItemContainer>
            {stockItems !== '' &&
              stockItems.map((item, index) => (
                <Item key={index} onClick={() => handleItemClick(item)}>
                  # {item._source.stockName}
                </Item>
              ))}
          </ItemContainer>
        )}
        <ButtonWrapper>
          {itemClicked &&
            stock &&
            btns.map(({ id, icon, label }) => (
              <Button
                key={id}
                draggable
                onDragStart={(e) => handleDragStart(e, { id, icon, label })}
              >
                {icon} {label}
              </Button>
            ))}
        </ButtonWrapper>
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
              data={areas[area]}
            />
          ))}
        </AttachWrapper>
      </RightWrapper>
    </Container>
  );
};

export default Board;
