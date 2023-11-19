import styled from 'styled-components';

export const MemoContainer = styled.div`
  background-color: #ffd700;
  border: 1px solid #ffc107;
  border-radius: 10px;
  user-select: none;
  width: 100%;
  height: 100%;
`;

export const CloseButton = styled.button`
  position: absolute;
  top: 5px;
  right: 5px;
  background: none;
  border: none;
  font-size: 16px;
  cursor: pointer;
`;

export const Textarea = styled.textarea`
  width: 90%;
  height: 90%;
  margin: 5%;
  resize: none;
  border: none;
  background-color: transparent;
  font-family: 'Arial', sans-serif;
  font-size: 14px;
  color: #333;
  outline: none;
`;
