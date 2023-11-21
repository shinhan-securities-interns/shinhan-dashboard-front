import React, { useState, useEffect } from 'react';
import ReactApexChart from 'react-apexcharts';
import { axiosInstance } from '../../apis';
import { Loading } from '../index';
import { Container, ChartWrapper } from './styled';

const FinancialStatementsChart = ({ flag, code }) => {
  const [chartData, setChartData] = useState([]);
  const [isEmpty, setIsEmpty] = useState(false);

  const getData = async (endpoint) => {
    try {
      const response = await axiosInstance.get(endpoint);
      return Object.values(response.data)[0];
    } catch (error) {
      console.error(error);
      throw error;
    }
  };

  const mergeData = (dataOne, dataTwo) => {
    const result = [];

    for (const time in dataOne) {
      if (
        dataTwo.hasOwnProperty(time) &&
        !isNaN(parseInt(dataOne[time])) &&
        !isNaN(parseInt(dataTwo[time]))
      ) {
        result.push({
          time: String(time),
          oneData: parseInt(dataOne[time]),
          twoData: parseInt(dataTwo[time]),
        });
      }
    }
    setChartData(result);
  };

  const fetchData = async () => {
    try {
      let endpointOne, endpointTwo;

      if (flag === 1) {
        endpointOne = `/revenue/quarter/${code}`;
        endpointTwo = `/operating_profit/quarter/${code}`;
      } else if (flag === 2) {
        endpointOne = `/per/quarter/${code}`;
        endpointTwo = `/pbr/quarter/${code}`;
      }
      const [dataOne, dataTwo] = await Promise.all([
        getData(endpointOne),
        getData(endpointTwo),
      ]);
      mergeData(dataOne, dataTwo);
    } catch (error) {
      console.error('데이터 가져오기 실패:', error);
    }
  };

  useEffect(() => {
    fetchData();
  }, [flag]);

  return (
    <Container>
      {chartData.length === 0 ? (
        <Loading flag={isEmpty} />
      ) : (
        <ChartWrapper>
          <ReactApexChart
            width={'100%'}
            height={'100%'}
            type="line"
            series={[
              {
                name: flag === 1 ? '매출액' : 'PER',
                data: chartData?.map((entry) => entry.oneData),
              },
              {
                name: flag === 1 ? '영업이익' : 'PBR',
                data: chartData?.map((entry) => entry.twoData),
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
                marginLeft: 20,
              },
              stroke: {
                curve: 'smooth',
                width: 4,
              },
              fill: {
                type: 'gradient',
                gradient: {
                  gradientToColors: [
                    '#F2CD5C',
                    '#F2921D',
                    '#A61F69',
                    '#400E32',
                  ],
                  stops: [0, 100],
                },
              },
              grid: {
                show: false,
              },
              plotOptions: {
                candlestick: {
                  wick: {
                    useFillColor: true,
                  },
                },
              },
              xaxis: {
                labels: {
                  show: true,
                },
                type: 'category',
                categories: chartData?.map((entry) => entry.time),
                axisBorder: {
                  show: false,
                },
                axisTicks: {
                  show: false,
                },
              },
              yaxis: {
                show: true,
              },
              tooltip: {
                y: {
                  formatter: (v) => (v !== undefined ? v.toFixed(2) : 'N/A'),
                },
              },
            }}
          />
        </ChartWrapper>
      )}
    </Container>
  );
};

export default FinancialStatementsChart;
