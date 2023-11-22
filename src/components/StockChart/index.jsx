import React, { useState, useEffect } from 'react';
import ReactApexChart from 'react-apexcharts';
import { axiosInstance } from '../../apis';
import { Loading } from '../index';
import { Container, ChartWrapper } from './styled';

const StockChart = ({ code, unit }) => {
  const [chartData, setChartData] = useState([]);

  const getData = async () => {
    try {
      const response = await axiosInstance.get(
        `http://${process.env.REACT_APP_INDI_URL}/indi-stock/${code}/charts/${unit}`,
        {
          headers: {
            'ngrok-skip-browser-warning': 'value',
          },
        }
      );
      if (unit === '1') {
        const modifiedChartData = response.data.chartData.map((item) => {
          return {
            ...item,
            time: item.time + '00',
          };
        });
        console.log(modifiedChartData);
        setChartData(formatChartData(modifiedChartData));
      } else {
        setChartData(formatChartData(response.data.chartData));
      }
    } catch (error) {
      console.error(error);
      throw error;
    }
  };

  const formatChartData = (data) => {
    if (!Array.isArray(data) || data.length === 0) {
      return [];
    }

    return data.map((item) => ({
      x: new Date(
        `${item.date.substring(0, 4)}-${item.date.substring(
          4,
          6
        )}-${item.date.substring(6)}T${item.time.substring(
          0,
          2
        )}:${item.time.substring(2, 4)}:${item.time.substring(4)}`
      ).getTime(),
      y: [
        parseFloat(item.openingPrice),
        parseFloat(item.highPrice),
        parseFloat(item.lowPrice),
        parseFloat(item.endPrice),
      ],
    }));
  };

  useEffect(() => {
    console.log(unit);
    getData();
  }, [unit]);

  useEffect(() => {
    console.log(chartData);
  }, [chartData]);

  return (
    <Container>
      {chartData.length === 0 ? (
        <Loading />
      ) : (
        <ChartWrapper>
          <ReactApexChart
            height={'100%'}
            type="candlestick"
            series={[
              {
                data: chartData,
              },
            ]}
            options={{
              theme: {
                mode: 'dark',
              },
              chart: {
                toolbar: {
                  tools: {},
                },
                background: 'transparent',
              },
              plotOptions: {
                candlestick: {
                  wick: {
                    useFillColor: true,
                  },
                  colors: {
                    upward: '#FF0000',
                    downward: '#0000FF',
                  },
                },
              },
              xaxis: {
                show: false,
                type: 'datetime',
                tickAmount: 5,
              },
              yaxis: {
                tooltip: {
                  enabled: true,
                },
              },
              tooltip: {
                y: {
                  formatter: (v) => `$ ${v.toFixed(2)}`,
                },
              },
              grid: {
                show: false,
              },
            }}
          />
        </ChartWrapper>
      )}
    </Container>
  );
};

export default StockChart;
