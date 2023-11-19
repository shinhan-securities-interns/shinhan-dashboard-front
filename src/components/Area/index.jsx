import React, { useState } from 'react';
import Draggable from 'react-draggable';
import { Resizable } from 're-resizable';
import { FSChart, StockChart } from '../index';
import { Container, Title, Content } from './styled';

const Area = ({ title, overFnc, dropFnc }) => {
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

  const renderItem = () => {
    switch (title) {
      case '📈':
        return <StockChart />;
      case '📊':
        return <FSChart />;
      default:
        return null;
    }
  };

  return (
    <Draggable position={position} onDrag={handleDrag} bounds="parent">
      <Resizable size={size} onResizeStop={handleResizeStop}>
        <Container onDragOver={overFnc} onDrop={dropFnc}>
          <Title>{title}</Title>
          <Content>
            {title === '📈' ? (
              <StockChart />
            ) : title === '📊' ? (
              <FSChart />
            ) : null}
          </Content>
        </Container>
      </Resizable>
    </Draggable>
  );
};

export default Area;
