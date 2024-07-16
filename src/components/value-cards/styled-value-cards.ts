import styled from 'styled-components';

export const CardsContainer = styled.div`
  width: 100%;
  display: flex;
  gap: 2rem;

  @media (max-width: 950px) {
    flex-direction: column;
  }
`;
