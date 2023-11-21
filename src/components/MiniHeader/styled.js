import styled, { keyframes } from 'styled-components';

export const Container = styled.div`
  width: 100%;
  height: 10%;
  display: flex;
  align-items: center;
  justify-content: flex-end;
`;

export const SlideContainer = styled.div`
  width: 50%;
  height: 60%;
  display: flex;
  justify-content: flex-end;
  overflow: hidden;
  font-size: 1.2rem;
`;

export const SlideWrapper = styled.div`
  width: 70%;
  display: flex;
  flex-direction: column;
  overflow: hidden;
`;

export const slideAnimation1 = keyframes`
    0% {
        transform: translateY(0%);
    }
    50% {
        transform: translateY(-100%);
    }
    50.1% {
        transform: translateY(100%);
    }
    100% {
        transform: translateY(0%);
    }
`;

export const slideAnimation2 = keyframes`
    0% {
        transform: translateY(0%);
    }
    100% {
        transform: translateY(-200%);
    }
`;

export const Slide = styled.div`
  display: flex;
  width: 100%;
  justify-content: space-between;
  align-items: center;
  flex-wrap: nowrap;
  position: relative;
  padding: 40px 0;
  animation: 10s linear infinite normal none running
    ${(props) => (props.original ? slideAnimation1 : slideAnimation2)};
  animation-play-state: running

  &::before {
    content: '';
    display: block;
    width: 100%;
    height: 1px;
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    background-color: #bbb;
    z-index: 1;
  }
`;

export const TextWrapper = styled.p`
  color: ${(props) =>
    props.color === 'red' ? 'red' : props.color === 'blue' ? 'blue' : 'black'};
`;

export const ImageWrapper = styled.div`
  width: 50%;
  display: flex;
  justify-content: center;
`;

export const Image = styled.img`
  width: 15vw;
  height: auto;
  margin-left: 20%;
`;
