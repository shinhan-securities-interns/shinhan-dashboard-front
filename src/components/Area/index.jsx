import React, { useState, useEffect } from 'react';
import Draggable from 'react-draggable';
import { Resizable } from 're-resizable';
import { useSetRecoilState } from 'recoil';
import LZString from 'lz-string';
import { isURLSearchParams } from '../../store/atoms';
import {
  FSTable,
  FSChart,
  StockChart,
  StockInformation,
  DiscussionCommunity,
} from '../index';
import {
  Container,
  Title,
  TitleWrapper,
  Content,
  ButtonWrapper,
  Button,
} from './styled';

const Area = ({ overFnc, dropFnc, data, id }) => {
  const setParamData = useSetRecoilState(isURLSearchParams);
  const [unit, setUnit] = useState('D');
  const [size, setSize] = useState({ width: '100%', height: '100%' });
  const [position, setPosition] = useState({ x: 0, y: 0 });

  const handleResize = (e, direction, ref, delta) => {
    setSize(() => ({
      width: ref.offsetWidth,
      height: ref.offsetHeight,
    }));
  };

  const handleDrag = (e, ui) => {
    setPosition({
      x: ui.x,
      y: ui.y,
    });
  };

  const handleClick = (e) => {
    switch (e.target.innerText) {
      case '월':
        return setUnit('M');
      case '주':
        return setUnit('W');
      case '일':
        return setUnit('D');
      case '분':
        return setUnit('1');
      default:
        return;
    }
  };

  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search);
    const dataParam = urlParams.get('data');
    const decodedParam = dataParam ? dataParam.replace(/ /g, '+') : null;

    if (decodedParam) {
      const decompressedData = LZString.decompressFromBase64(decodedParam);
      const initialData = JSON.parse(decompressedData);

      console.log(initialData.info);

      setParamData((prevData) => ({
        ...prevData,
        info: initialData.info,
      }));

      if (initialData.info && initialData.info[id]) {
        const areaInfo = initialData.info[id];

        if (areaInfo.size) {
          setSize(areaInfo.size);
        }

        if (areaInfo.position) {
          setPosition(areaInfo.position);
        }
      }
    }
  }, [id]);

  useEffect(() => {
    setParamData((prevData) => ({
      ...prevData,
      info: {
        ...prevData.info,
        [id]: {
          position,
          size,
        },
      },
    }));
  }, [id, size, position]);

  console.log(id);

  return (
    <Draggable position={position} onDrag={handleDrag} bounds="parent">
      <Resizable
        size={size}
        onResizeStop={(e, direction, ref, delta) =>
          handleResize(e, direction, ref, delta)
        }
      >
        <Container onDragOver={overFnc} onDrop={dropFnc}>
          {data.label === '주식 차트' ? (
            <TitleWrapper>
              <Title isStockChart={'true'}>
                {data.length !== 0 &&
                  `${data.icon} ${data.stock.name} ${data.label}`}
              </Title>
              <ButtonWrapper>
                <Button
                  onClick={(e) => {
                    handleClick(e);
                  }}
                >
                  월
                </Button>
                <Button
                  onClick={(e) => {
                    handleClick(e);
                  }}
                >
                  주
                </Button>
                <Button
                  onClick={(e) => {
                    handleClick(e);
                  }}
                >
                  일
                </Button>
                <Button
                  onClick={(e) => {
                    handleClick(e);
                  }}
                >
                  분
                </Button>
              </ButtonWrapper>
            </TitleWrapper>
          ) : (
            <Title>
              {data.length !== 0 &&
                `${data.icon} ${data.stock.name} ${data.label}`}
            </Title>
          )}
          <Content>
            {data.label === '주식 차트' ? (
              <StockChart code={data.stock.code} unit={unit} />
            ) : data.label === '매출액 / 영업이익 차트' ? (
              <FSChart flag={1} code={data.stock.code} />
            ) : data.label === 'PER / PBR 차트' ? (
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
