import React from 'react';
import ReactApexChart from 'react-apexcharts';
import { Container, ChartWrapper } from './styled';

const FinancialStatementsChart = () => {
  const data = [
    { time_close: 1637221800000, salesFigures: 50, operatingProfit: 10 },
    { time_close: 1637308200000, salesFigures: 155, operatingProfit: 55 },
    { time_close: 1637394600000, salesFigures: 185, operatingProfit: 80 },
    { time_close: 1637481000000, salesFigures: 165, operatingProfit: 65 },
    { time_close: 1637567400000, salesFigures: 150, operatingProfit: 70 },
    { time_close: 1637653800000, salesFigures: 75, operatingProfit: 20 },
    { time_close: 1637740200000, salesFigures: 180, operatingProfit: 80 },
    { time_close: 1637826600000, salesFigures: 185, operatingProfit: 85 },
    { time_close: 1637913000000, salesFigures: 155, operatingProfit: 60 },
    { time_close: 1637999400000, salesFigures: 195, operatingProfit: 95 },
  ];

  return (
    <Container>
      <ChartWrapper>
        <ReactApexChart
          height={'100%'}
          type="line"
          series={[
            {
              name: '매출액',
              data: data?.map((entry) => entry.salesFigures),
            },
            {
              name: '영업이익',
              data: data?.map((entry) => entry.operatingProfit),
            },
          ]}
          options={{
            theme: {
              mode: 'dark',
            },
            chart: {
              height: 500,
              width: 500,
              toolbar: {
                tools: {},
              },
              background: 'transparent',
            },
            stroke: {
              curve: 'smooth',
              width: 4,
            },
            fill: {
              type: 'gradient',
              gradient: {
                gradientToColors: ['#F2CD5C', '#F2921D', '#A61F69', '#400E32'],
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
                show: false,
                datetimeFormatter: {
                  month: "mmm 'yy",
                },
              },
              type: 'datetime',
              categories: data?.map((entry) => entry.time_close),
              axisBorder: {
                show: false,
              },
              axisTicks: {
                show: false,
              },
            },
            yaxis: {
              show: false,
            },
            tooltip: {
              y: {
                formatter: (v) => `$ ${v.toFixed(2)}`,
              },
            },
          }}
        />
      </ChartWrapper>
    </Container>
  );
};

export default FinancialStatementsChart;
