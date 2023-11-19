import React from 'react';
import { Container, Image } from './styled';
import logo from '../../assets/images/MYS2D.svg';

const MiniHeader = () => {
  return (
    <Container>
      <Image src={logo} alt="logo" />
    </Container>
  );
};

export default MiniHeader;
