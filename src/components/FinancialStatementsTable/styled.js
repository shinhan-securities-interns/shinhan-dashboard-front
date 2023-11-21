import styled, { keyframes } from 'styled-components';

const fadeIn = keyframes`
  from {
    opacity: 0;
  }
  to {
    opacity: 1;
  }
`;

export const Container = styled.div`
  width: 100%;
  height: 100%;
  font-size: 0.8rem;
  background-color: white;
`;

export const TableContainer = styled.div`
  overflow: hidden;
  border-radius: 15px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
`;

export const Table = styled.table`
  width: 100%;
  border-collapse: collapse;
  margin-bottom: 30px;
  animation: ${fadeIn} 0.5s ease;
`;

export const TableHead = styled.thead`
  color: #0137c6;
`;

export const TableBody = styled.tbody``;

export const TableRow = styled.tr`
  &:nth-child(even) {
    background-color: #e2e8f5;
  }
`;

export const TableCell = styled.td`
  border: 1px solid #ddd;
  padding: 10px;
  text-align: center;
  transition: background-color 0.3s ease;

  &:hover {
    background-color: #e0e0e0;
  }
`;
