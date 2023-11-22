import React, { useState, useEffect } from 'react';
import { useRecoilState } from 'recoil';
import { Loading } from '../index';
import { socketState } from '../../store/atoms';
import { axiosInstance } from '../../apis';
import { Container, StyledTable, StyledTR, Key, Value } from './styled';

const StockInformation = ({ code }) => {
  const [socketAvailable, isSocketAvailable] = useRecoilState(socketState);
  const [socket, setSocket] = useState(null);
  const [stockData, setStockData] = useState(null);
  const [loadData, setLoadData] = useState(false);
  const jsonData = {};
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

  const getPrice = async () => {
    try {
      const response = await axiosInstance.get(
        `http://${process.env.REACT_APP_INDI_URL}/indi-stock/${code}/price`,
        {
          headers: {
            'ngrok-skip-browser-warning': 'value',
          },
        }
      );
      setStockData(response.data.priceInfo);
    } catch (error) {
      console.error(error);
      throw error;
    }
  };

  useEffect(() => {
    if (socketAvailable) {
      const newSocket = new WebSocket('ws://133.186.151.211:8767');
      setSocket(newSocket);

      newSocket.addEventListener('open', () => {
        console.log('WebSocket 연결이 열렸습니다.');
        newSocket.send(code);
      });

      newSocket.addEventListener('message', (event) => {
        const string = event.data.replace('{', '');
        const string2 = string.replace('}', '');
        const parts = string2.split(',');
        const jsonData = {};
        parts.forEach((part) => {
          const [key, value] = part.split(':');
          const trimmedKey = key?.trim().replace(/"/g, '') || '';
          const trimmedValue = value?.trim().replace(/"/g, '') || '';
          jsonData[trimmedKey] = trimmedValue;
        });
        const { dayOverDayChange, ...filteredData } = jsonData;
        setStockData(filteredData);
        setLoadData(true);
      });

      newSocket.addEventListener('close', () => {
        console.log('WebSocket 연결이 닫혔습니다.');
        isSocketAvailable(false);
        getPrice();
      });

      newSocket.addEventListener('error', (event) => {
        console.error('WebSocket 에러:', event.data);
      });

      return () => {
        newSocket.close();
      };
    } else {
      getPrice();
    }
  }, [code]);

  return (
    <Container>
      {stockData === null || !loadData ? (
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
