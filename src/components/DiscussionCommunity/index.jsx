import React, { useEffect, useState } from 'react';
import { axiosInstance } from '../../apis';
import { Posting, Loading } from '../index';
import { Container, Wrapper } from './styled';

const DiscussionCommunity = ({ code }) => {
  const [list, setList] = useState([]);

  const getList = async () => {
    try {
      const response = await axiosInstance.get(`/stock-talk/${code}`);
      console.log(response.data);
      setList(response.data.board);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    console.log(code);
    getList();
  }, []);

  return (
    <Container>
      <Wrapper>
        {list.length === 0 ? (
          <Loading />
        ) : (
          list.map((item) => (
            <Posting key={item.index} data={item} code={code} />
          ))
        )}
      </Wrapper>
    </Container>
  );
};

export default DiscussionCommunity;
