import styled, { keyframes } from 'styled-components';

const smoothAppear = keyframes`
  from {
    opacity: 0;
    transform: translateY(-5%);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
`;

export const Container = styled.div`
  width: 90vw;
  height: 90vh;
  background: rgba(255, 255, 255, 0.2);
  box-shadow: 1px -3px 1px 0 rgba(255, 255, 255, 0.3);
  border-radius: 15px;
  display: flex;
  position: relative;
  overflow: hidden;
`;

export const Menu = styled.div`
  width: 15%;
  border-radius: 15px;
`;

export const ItemContainer = styled.div`
  height: 85%;
  overflow-y: auto;
  overflow-x: hidden;
  -ms-overflow-style: none;
  scrollbar-width: none;

  /* Webkit (Chrome, Safari, etc.) */
  &::-webkit-scrollbar {
    width: 0;
  }

  &::-webkit-scrollbar-thumb {
    background-color: transparent;
  }

  &::-webkit-scrollbar-track {
    background-color: transparent;
  }
`;

export const Item = styled.div`
  height: 5vh;
  width: 100%;
  font-size: 1.2rem;
  color: transparent;
  padding-left: 1vw;
  background-image: linear-gradient(to top, #0074cc, #ffffff);
  -webkit-background-clip: text;
  background-clip: text;
  cursor: pointer;
  &:hover {
    color: white;
  }
`;

export const ButtonWrapper = styled.div`
  height: 80%;
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  margin-left: 1vw;
`;

export const RightWrapper = styled.div`
  width: 85%;
  display: flex;
  flex-direction: column;
  border-radius: 15px;
`;

export const AttachWrapper = styled.div`
  width: 100%;
  height: 90%;
  position: relative;
  z-index: 1;
  border-radius: 15px;
  border: 2px dashed rgba(255, 255, 255, 0.3);
  box-sizing: border-box;
  display: grid;
  gap: 1%;
  grid-template-columns: repeat(2, 1fr);
  grid-template-rows: repeat(2, 1fr);
`;

export const Button = styled.div`
  width: 90%;
  height: 8%;
  display: flex;
  border-radius: 15px;
  cursor: pointer;
  font-size: 0.9rem;
  color: white;
  background: #eaeaea4f;
  justify-content: center;
  align-items: center;
  animation: ${smoothAppear} 1s;
`;

export const AddButton = styled.button`
  width: 5%;
  height: 80%;
  position: fixed;
  top: -31vh;
  left: 18.5vw;
  border: none;
  font-size: 2rem;
  color: white;
  cursor: pointer;
  background-color: transparent;
  z-index: 10;
`;

export const MemoWrapper = styled.div`
  position: fixed;
  top: 12.5vh;
  left: 18.5vw;
  z-index: 99;
`;
