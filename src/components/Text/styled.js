import styled from 'styled-components';

const textStyles = {
  text1: {
    fontWeight: 'bold',
    fontSize: '12px',
    color: 'white',
  },
};

export const StyledText = styled.p`
  ${(props) => textStyles[props.theme]}
`;
