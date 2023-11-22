import styled from 'styled-components';

export const Container = styled.div`
  width: 100%;
  height: 100%;
  cursor: pointer;
  display: flex;
  flex-direction: column;
  border-radius: 15px;
  background: rgba(255, 255, 255, 0.3);
  box-shadow: inset 1px 3px 1px 0 rgba(255, 255, 255, 0.4);
`;
export const TitleWrapper = styled.div`
  display: flex;
`;

export const Title = styled.div`
  width: ${(props) => (props.isStockChart === 'true' ? '68%' : '98%')};
  padding-left: 2%;
  padding-top: 2%;
  height: 8%;
  color: white;
`;

export const ButtonWrapper = styled.div`
  width: 30%;
  height: 8%;
  padding-top: 2%;
  display: flex;
  justify-content: center;
`;

export const Button = styled.button`
  width: 20%;
  background: transparent;
  &:hover {
    color: white;
  }
`;

export const Content = styled.div`
  width: 98%;
  height: 88%;
  margin: 1%;
  border-radius: 15px;
  overflow: hidden;
  box-shadow: 0px 4px 8px 0 rgba(0, 0, 0, 0.4);
`;
