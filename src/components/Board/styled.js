import styled from 'styled-components';

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

export const Button = styled.button`
  width: 70px;
  height: 70px;
  border: none;
  border-radius: 8px;
  margin: 12px;
  cursor: move;
  font-size: 30px;
  background: #eaeaea4f;
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
