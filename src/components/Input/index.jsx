import { useState } from 'react';
import { Container, UserInput, Label, InputWrapper, Image } from './styled';
import search from '../../assets/images/search.svg';

const Input = () => {
  const [inputText, setInputText] = useState('');
  const [isSearching, setIsSearching] = useState(false);

  const handleChange = (e) => {
    setInputText(e.target.value);
  };

  const handleEnter = (e) => {
    if (e.key === 'Enter') {
      console.log('enter');
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
          <Image src={search} alt="검색" />
        </InputWrapper>
      )}
    </Container>
  );
};

export default Input;
