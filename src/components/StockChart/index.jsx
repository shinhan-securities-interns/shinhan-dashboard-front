import React from 'react';
import ReactApexChart from 'react-apexcharts';
import { Container, ChartWrapper } from './styled';

const StockChart = () => {
  const data = [
    { time_close: 1637221800000, open: 150, high: 160, low: 140, close: 155 },
    { time_close: 1637308200000, open: 155, high: 165, low: 145, close: 160 },
    { time_close: 1637394600000, open: 160, high: 170, low: 150, close: 165 },
    { time_close: 1637481000000, open: 165, high: 300, low: 155, close: 300 },
    { time_close: 1637567400000, open: 300, high: 250, low: 160, close: 175 },
    { time_close: 1637653800000, open: 175, high: 185, low: 165, close: 180 },
    { time_close: 1637740200000, open: 180, high: 200, low: 170, close: 185 },
    { time_close: 1637826600000, open: 185, high: 195, low: 175, close: 190 },
    { time_close: 1637913000000, open: 190, high: 200, low: 180, close: 195 },
    { time_close: 1637999400000, open: 195, high: 205, low: 185, close: 200 },
    { time_close: 1638085800000, open: 200, high: 230, low: 190, close: 205 },
    { time_close: 1638172200000, open: 205, high: 215, low: 195, close: 210 },
    { time_close: 1638258600000, open: 210, high: 220, low: 200, close: 215 },
    { time_close: 1638345000000, open: 215, high: 225, low: 205, close: 220 },
    { time_close: 1638431400000, open: 220, high: 260, low: 210, close: 200 },
    { time_close: 1638517800000, open: 225, high: 235, low: 215, close: 230 },
    { time_close: 1638604200000, open: 230, high: 240, low: 220, close: 235 },
    { time_close: 1638690600000, open: 235, high: 245, low: 225, close: 240 },
    { time_close: 1638777000000, open: 240, high: 250, low: 230, close: 245 },
    { time_close: 1638863400000, open: 245, high: 255, low: 235, close: 250 },
    { time_close: 1638949800000, open: 250, high: 260, low: 240, close: 255 },
    { time_close: 1639036200000, open: 255, high: 265, low: 245, close: 260 },
    { time_close: 1639122600000, open: 260, high: 270, low: 250, close: 265 },
    { time_close: 1639209000000, open: 265, high: 275, low: 255, close: 270 },
    { time_close: 1639295400000, open: 270, high: 280, low: 260, close: 275 },
    { time_close: 1639381800000, open: 275, high: 285, low: 265, close: 280 },
    { time_close: 1639468200000, open: 280, high: 260, low: 195, close: 210 },
    { time_close: 1639554600000, open: 285, high: 295, low: 275, close: 290 },
    { time_close: 1639641000000, open: 290, high: 300, low: 280, close: 295 },
    { time_close: 1639727400000, open: 295, high: 305, low: 285, close: 300 },
  ];
  return (
    <Container>
      <ChartWrapper>
        <ReactApexChart
          height={'100%'}
          type="candlestick"
          series={[
            {
              data: data?.map((price) => ({
                x: price.time_close,
                y: [price.open, price.high, price.low, price.close],
              })),
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
              labels: {
                show: false,
                datetimeFormatter: {
                  month: "mmm 'yy",
                },
              },
              type: 'datetime',
              categories: data?.map((date) => date.time_close),
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
    </Container>
  );
};

export default StockChart;
