import React from 'react';
import { Container, Image } from './styled';
import loading from '../../assets/images/loading.gif';

const Loading = ({ flag }) => {
  console.log(flag);
  return (
    <Container>
      {flag ? (
        <>🙅🏻‍♂️ 재무 정보가 없는 종목입니다.</>
      ) : (
        <>
          <Image src={loading} alt="loading " />
          불러오는 중
        </>
      )}
    </Container>
  );
};

export default Loading;
