import React, { useState } from 'react';
import { axiosInstance } from '../../apis';
import {
  Container,
  TopText,
  TopWrapper,
  Title,
  Text,
  Detail,
  Link,
} from './styled';

const Posting = ({ data, code }) => {
  const [isExpanded, setIsExpanded] = useState(false);
  const [post, setPost] = useState([]);

  const getListItem = async ({ index }) => {
    try {
      const response = await axiosInstance.get(
        `/stock-talk/${code}/contents/${index}`
      );
      setPost(response.data);
      console.log(response.data);
    } catch (error) {
      console.error(error);
    }
  };

  const handleClick = () => {
    setIsExpanded((prevIsExpanded) => !prevIsExpanded);
    getListItem({ index: data.index });
  };

  return (
    <Container onClick={handleClick} isExpanded={isExpanded}>
      <TopWrapper isExpanded={isExpanded}>
        <TopText>{data.date}</TopText>
        <TopText>{data.writer}</TopText>
      </TopWrapper>
      <Title isExpanded={isExpanded}>{data.title}</Title>
      {isExpanded && (
        <Detail>
          <Text>{post.contents}</Text>
          <Link href={data.href} target="_blank">
            네이버 종목토론실 가기
          </Link>
        </Detail>
      )}
    </Container>
  );
};

export default Posting;
