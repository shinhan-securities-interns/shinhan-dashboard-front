import React from 'react';
import { Container, Image } from './styled';
import loading from '../../assets/images/loading.gif';

const Loading = () => {
  return (
    <Container>
      <Image src={loading} alt="loading " />
      불러오는 중
    </Container>
  );
};

export default Loading;
