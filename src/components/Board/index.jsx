import React, { useState, useEffect } from 'react';
import { useRecoilValue, useRecoilState } from 'recoil';
import LZString from 'lz-string';
import { stockItemsState, isURLSearchParams } from '../../store/atoms';
import { Area, Input, MiniHeader, StickyNote } from '../index';
import memo from '../../assets/images/memo.png';
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
  const [paramData, setParamData] = useRecoilState(isURLSearchParams);
  const stockItems = useRecoilValue(stockItemsState);
  const [stickers, setStickers] = useState(null);
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
    { id: 'btn5', icon: '📊', label: 'PER / PBR 차트' },
    { id: 'btn6', icon: '🗨️', label: '종목토론방' },
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
    setStickers({ x: 30, y: 20, width: 150, height: 150, text: '' });
  };

  const handleDeleteSticker = () => {
    setStickers(null);
    setParamData((prevData) => ({
      ...prevData,
      memo: null,
    }));
  };

  const handleItemClick = (item) => {
    setItemClicked(true);
    setStock({
      name: item._source.stockName,
      code: item._source.stockCode,
    });
  };

  useEffect(() => {
    setItemClicked(false);
  }, [stockItems]);

  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search);
    const dataParam = urlParams.get('data');
    const decodedParam = dataParam ? dataParam.replace(/ /g, '+') : null;
    if (decodedParam) {
      const decompressedData = LZString.decompressFromBase64(decodedParam);
      const initialData = JSON.parse(decompressedData);
      setStickers(initialData.memo);
      setAreas(initialData.areas);
      setParamData((prevData) => ({
        ...prevData,
        memo: initialData.memo,
        areas: initialData.areas,
      }));
    }
  }, []);

  useEffect(() => {
    setParamData((prevData) => ({
      ...prevData,
      areas: areas,
    }));
  }, [areas]);

  useEffect(() => {
    console.log(paramData);
    const save = LZString.compressToBase64(JSON.stringify(paramData));
    window.history.pushState({}, null, `?data=${save}`);
  }, [paramData]);

  console.log(paramData);
  console.log(stickers);

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
          {stickers && stickers.x !== null && !isNaN(stickers.x) && (
            <StickyNote
              value={stickers.text}
              initialPosition={{ x: stickers.x, y: stickers.y }}
              initialSize={{ width: stickers.width, height: stickers.height }}
              onDelete={handleDeleteSticker}
            />
          )}
        </MemoWrapper>
        <AddButton src={memo} onClick={handleAddSticker} />
        <AttachWrapper>
          {Object.keys(areas).map((area) => (
            <Area
              overFnc={handleDragOver}
              dropFnc={(e) => handleDrop(e, area)}
              key={area}
              data={areas[area]}
              id={area}
            />
          ))}
        </AttachWrapper>
      </RightWrapper>
    </Container>
  );
};

export default Board;
