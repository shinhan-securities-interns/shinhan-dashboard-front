import styled from 'styled-components';

export const Container = styled.div`
  width: 85%;
  height: ${({ isExpanded }) => (isExpanded ? '80%' : '25%')};
  padding: 0% 5%;
  border-radius: 15px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  background: #e2e8f5;
  margin-bottom: 2%;
  pointer-events: auto;
  transition: height 0.3s ease;
`;
export const TopWrapper = styled.div`
  width: 100%;
  height: ${({ isExpanded }) => (isExpanded ? '20%' : '50%')};
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

export const TopText = styled.p`
  font-size: 0.6rem;
  color: #333;
`;

export const Title = styled.p`
  width: 100%;
  height: ${({ isExpanded }) => (isExpanded ? '20%' : '50%')};
  font-size: 0.8rem;
  display: flex;
  justify-content: flex-start;
  white-space: ${({ isExpanded }) => (isExpanded ? 'normal' : 'nowrap')};
  overflow: hidden;
  line-height: 1.5;
`;

export const Detail = styled.div`
  height: 60%;
  font-size: 0.8rem;
`;
export const Text = styled.p`
  height: 70%;
  overflow-y: auto;
  overflow-x: hidden;
  -ms-overflow-style: none;
  scrollbar-width: none;

  /* Webkit (Chrome, Safari, etc.) */
  &::-webkit-scrollbar {
    width: 0;
  }

  &::-webkit-scrollbar-thumb {
    background-color: transparent;
  }

  &::-webkit-scrollbar-track {
    background-color: transparent;
  }
`;
export const Link = styled.a`
  height: 30%;
  color: #0137c6;
`;
