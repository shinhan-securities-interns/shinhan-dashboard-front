import React from 'react';
import { StyledText } from './styled';

const Text = ({ theme, children }) => {
  return <StyledText theme={theme}>{children}</StyledText>;
};

export default Text;
