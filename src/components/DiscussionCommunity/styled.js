import styled from 'styled-components';

export const Container = styled.div`
  width: 100%;
  height: 35vh;
  overflow: hidden;
  background: white;
  display: flex;
  justify-content: center;
  align-items: center;
`;

export const Wrapper = styled.div`
  width: 95%;
  height: 90%;
  border-radius: 15px;
  padding: 0 5% 5% 5%
  overflow-y: scroll;
  overflow-x: hidden;
  -ms-overflow-style: none;
  scrollbar-width: thin; 

  /* Webkit (Chrome, Safari, etc.) */
  &::-webkit-scrollbar {
    width: 10px;
  }

  &::-webkit-scrollbar-thumb {
    background-color: #e2e8f5;
    border-radius: 5px; 
  }

  &::-webkit-scrollbar-track {
    background-color: transparent;
  }
`;
