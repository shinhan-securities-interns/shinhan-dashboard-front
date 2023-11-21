import React, { useState } from 'react';
import Draggable from 'react-draggable';
import { Resizable } from 're-resizable';
import {
  FSTable,
  FSChart,
  StockChart,
  StockInformation,
  DiscussionCommunity,
} from '../index';
import { Container, Title, Content } from './styled';

const Area = ({ overFnc, dropFnc, data }) => {
  const [size, setSize] = useState({ width: '100%', height: '100%' });
  const [position, setPosition] = useState({ x: 0, y: 0 });

  const handleResizeStop = (e, direction, ref, d) => {
    setSize((prevSize) => ({
      width: prevSize.width + d.width,
      height: prevSize.height + d.height,
    }));
  };

  const handleDrag = (e, ui) => {
    setPosition({
      x: ui.x,
      y: ui.y,
    });
  };

  return (
    <Draggable position={position} onDrag={handleDrag} bounds="parent">
      <Resizable size={size} onResizeStop={handleResizeStop}>
        <Container onDragOver={overFnc} onDrop={dropFnc}>
          <Title>
            {data && `${data.icon} ${data.stock.name} ${data.label}`}
          </Title>
          <Content>
            {data.label === '주식 차트' ? (
              <StockChart code={data.stock.code} />
            ) : data.label === '매출액 / 영업이익 차트' ? (
              <FSChart flag={1} code={data.stock.code} />
            ) : data.label === '당기순이익 / PER 차트' ? (
              <FSChart flag={2} code={data.stock.code} />
            ) : data.label === '종목토론방' ? (
              <DiscussionCommunity code={data.stock.code} />
            ) : data.label === '재무제표' ? (
              <FSTable code={data.stock.code} />
            ) : data.label === '종목 정보' ? (
              <StockInformation code={data.stock.code} />
            ) : null}
          </Content>
        </Container>
      </Resizable>
    </Draggable>
  );
};

export default Area;
