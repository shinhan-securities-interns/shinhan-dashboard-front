import styled from 'styled-components';

export const MemoContainer = styled.div`
  background: linear-gradient(to bottom right, #fae387, #ffe371);
  border: 1px solid #ffd631;
  border-radius: 5px;
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
  font-size: 0.8rem;
  cursor: pointer;
  color: #85732c;
`;

export const Textarea = styled.textarea`
  width: 90%;
  height: 90%;
  margin: 5%;
  resize: none;
  border: none;
  background-color: transparent;
  font-size: 14px;
  color: #333;
  outline: none;
`;
