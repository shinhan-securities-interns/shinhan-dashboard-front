import styled from 'styled-components';

export const Container = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  border-radius: 15px;
  background: rgba(0, 0, 0, 0.6);
`;

export const ChartWrapper = styled.div`
  width: 95%;
  height: 85%;
  margin-top: 2%;
`;

export const ButtonList = styled.div`
  width: 10%;
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  align-items: center;
  border-radius: 15px;
`;

export const DateUnit = styled.button`
  width: 80%;
  height: 15%;
  background: rgba(255, 255, 255, 0.7);
  border-radius: 15px;
  transition: background-color 0.3s ease;
  &:hover {
    background: rgba(128, 128, 128, 0.7);
    color: white;
  }
`;
