import { useState } from 'react';
import { useSetRecoilState } from 'recoil';
import { stockItemsState } from '../../store/atoms';
import { axiosInstance } from '../../apis';

import { Container, UserInput, Label, InputWrapper, Image } from './styled';

import search from '../../assets/images/search.svg';

const Input = () => {
  const [inputText, setInputText] = useState('');
  const [isSearching, setIsSearching] = useState(false);

  const setSearchResults = useSetRecoilState(stockItemsState);

  const handleChange = (e) => {
    setInputText(e.target.value);
  };

  const handleEnter = (e) => {
    if (e.key === 'Enter') {
      getStockList();
    }
  };

  const getStockList = async () => {
    try {
      const isNumber = /^\d+$/.test(inputText);

      const query = isNumber
        ? { match: { stockCode: inputText } }
        : { match: { stockName: inputText } };

      const response = await axiosInstance.post(
        `http://${process.env.REACT_APP_SEARCH_SERVER_URL}/jaso/_search`,
        {
          size: 30,
          query,
          _source: ['stockCode', 'stockName'],
        }
      );
      if (response.data.hits.hits.length > 0) {
        setSearchResults(response.data.hits.hits);
      } else {
        console.log('조건에 맞는 종목이 없습니다.');
      }
    } catch (error) {
      console.error('No response received:', error);
      console.error('Request Error:', error.message);
    }
  };

  return (
    <Container>
      {!isSearching ? (
        <Label onClick={() => setIsSearching(true)}>종목 검색하기 🔍</Label>
      ) : (
        <InputWrapper>
          <UserInput
            value={inputText}
            onChange={handleChange}
            onKeyDown={handleEnter}
          />
          <Image onClick={getStockList} src={search} alt="검색" />
        </InputWrapper>
      )}
    </Container>
  );
};

export default Input;
