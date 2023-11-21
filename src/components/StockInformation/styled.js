import styled, { keyframes } from 'styled-components';

export const Container = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  background: white;
`;

export const StyledTable = styled.div`
  width: 100%;
  height: 100%;
  border-radius: 10px;
  overflow: hidden;
  display: grid;
  grid-template-columns: repeat(2, 1fr);
`;

export const Key = styled.div`
  padding: 10px;
  font-size: 1rem;
  display: flex;
  justify-content: flex-start;
  align-items: center;
`;
export const Value = styled.div`
  padding: 10px;
  font-size: 1rem;
  display: flex;
  justify-content: flex-end;
  align-items: center;
  &:hover {
    color: #0137c6;
  }
`;

export const StyledTR = styled.div`
  width: 100%;
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  border: 1px solid #ddd;
  &:nth-child(4n-2) {
    background-color: #e2e8f5;
  }
  &:nth-child(4n-1) {
    background-color: #e2e8f5;
  }
`;
