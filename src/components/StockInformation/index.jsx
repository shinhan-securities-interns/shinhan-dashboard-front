import React, { useState, useEffect } from 'react';
import { Loading } from '../index';
import { Container, StyledTable, StyledTR, Key, Value } from './styled';

const StockInformation = ({ code }) => {
  const [socket, setSocket] = useState(null);
  const [stockData, setStockData] = useState(null);
  const keyMap = {
    stockCode: '단축코드',
    realPrice: '현재가',
    dayOverDayCategory: '전일대비구분',
    dayOverDayPercentage: '전일대비율',
    cumulativeTradingVolume: '누적거래량',
    cumulativeTradingValue: '누적거래대금',
    unitTrasactionVolume: '단위체결량',
    openingPrice: '시가',
    highPrice: '고가',
    lowPrice: '저가',
    tradingIntensity: '거래강도',
    trasctionIntesity: '체결강도',
  };

  useEffect(() => {
    const newSocket = new WebSocket('ws://133.186.151.211:8767');
    setSocket(newSocket);

    newSocket.addEventListener('open', () => {
      console.log('WebSocket 연결이 열렸습니다.');
      newSocket.send(code);
    });

    newSocket.addEventListener('message', (event) => {
      const receivedData = JSON.parse(event.data);
      const { dayOverDayChange, ...filteredData } = receivedData;
      setStockData(filteredData);
    });

    newSocket.addEventListener('close', () => {
      console.log('WebSocket 연결이 닫혔습니다.');
    });

    newSocket.addEventListener('error', (event) => {
      console.error('WebSocket 에러:', event.data);
    });

    return () => {
      newSocket.close();
    };
  }, [code]);
  console.log(stockData);
  return (
    <Container>
      {stockData === null ? (
        <Loading />
      ) : (
        <StyledTable>
          {Object.keys(keyMap).map((key) => (
            <StyledTR key={key}>
              <Key>{keyMap[key]}</Key>
              <Value>{stockData[key]}</Value>
            </StyledTR>
          ))}
        </StyledTable>
      )}
    </Container>
  );
};

export default StockInformation;
