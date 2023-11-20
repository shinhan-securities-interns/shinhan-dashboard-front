import styled, { keyframes } from 'styled-components';

const blink = keyframes`
  0% {
    opacity: 0;
  }
  50% {
    opacity: 1;
  }
  100% {
    opacity: 0;
  }
`;

const fadeIn = keyframes`
  from {
    opacity: 0;
  }
  to {
    opacity: 1;
  }
`;

export const Container = styled.div`
  width: 95%;
  padding: 2.5%;
  height: 10%;
  display: flex;
  align-items: center;
  justify-content: center;
`;

export const Label = styled.p`
  color: white;
  margin-left: 5%;
  animation: ${blink} 2s linear infinite;
`;

export const InputWrapper = styled.div`
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: space-around;
  animation: ${fadeIn} 0.5s ease-in-out;
`;

export const UserInput = styled.input`
  height: 5vh;
  width: 70%;
  border-radius: 15px;
  border: 2px solid #ececec;
  box-shadow: 3px 5px 8px -3px gray;
  padding-left: 1vw;
`;

export const Image = styled.img`
  width: 12%;
  height: auto;
  filter: invert(100%);
`;
