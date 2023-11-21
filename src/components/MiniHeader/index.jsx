import React, { useEffect, useState } from 'react';
import { axiosInstance } from '../../apis';
import {
  Container,
  SlideContainer,
  SlideWrapper,
  Slide,
  TextWrapper,
  Image,
  ImageWrapper,
} from './styled';
import logo from '../../assets/images/MYS2D.svg';

const MiniHeader = () => {
  const [data, setData] = useState(null);
  const [predict, setPredict] = useState(null);

  const fetchData = async () => {
    try {
      const response = await axiosInstance.get(`/kospi/kosdaq`);
      setData(response.data);
    } catch (error) {
      console.error(error);
    }
  };

  const fetchPredict = async () => {
    try {
      const response = await axiosInstance.get(`/prediction/kospi/kosdaq`);
      setPredict(response.data);
    } catch (error) {
      console.error(error);
    }
  };

  const resetURL = () => {
    const currentUrl = window.location.href;
    const updatedUrl = currentUrl.split('?')[0];
    window.location.href = updatedUrl;
  };

  useEffect(() => {
    fetchPredict();
    setInterval(() => {
      fetchData();
    }, 3000);
  }, []);

  const isDataAndPredictAvailable = data && predict;
  console.log(data);
  return (
    <Container>
      {isDataAndPredictAvailable && (
        <SlideContainer>
          <SlideWrapper>
            <Slide original>
              <TextWrapper>코스피</TextWrapper>
              <TextWrapper>{data.kospi_now}</TextWrapper>
              <TextWrapper
                color={data.kospi_ratio.includes('+') ? 'red' : 'blue'}
              >
                {data.kospi_num}
              </TextWrapper>
              <TextWrapper
                color={data.kospi_ratio.includes('+') ? 'red' : 'blue'}
              >
                {data.kospi_ratio}
              </TextWrapper>
              전망 예측
              <TextWrapper
                color={
                  predict.kospi_prediction.includes('상승') ? 'red' : 'blue'
                }
              >
                {predict.kospi_prediction}
              </TextWrapper>
            </Slide>
            <Slide>
              코스닥
              <TextWrapper>{data.kosdaq_now}</TextWrapper>
              <TextWrapper
                color={data.kosdaq_ratio.includes('+') ? 'red' : 'blue'}
              >
                {data.kosdaq_num}
              </TextWrapper>
              <TextWrapper
                color={data.kosdaq_ratio.includes('+') ? 'red' : 'blue'}
              >
                {data.kosdaq_ratio}
              </TextWrapper>
              전망 예측
              <TextWrapper
                color={
                  predict.kosdaq_prediction.includes('상승') ? 'red' : 'blue'
                }
              >
                {predict.kosdaq_prediction}
              </TextWrapper>
            </Slide>
          </SlideWrapper>
        </SlideContainer>
      )}
      <ImageWrapper>
        <Image
          onClick={() => {
            resetURL();
          }}
          src={logo}
          alt="logo"
        />
      </ImageWrapper>
    </Container>
  );
};

export default MiniHeader;
