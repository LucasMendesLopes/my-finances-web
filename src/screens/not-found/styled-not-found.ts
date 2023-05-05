import styled from 'styled-components';

export const Container = styled.div`
  position: absolute;
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;
  gap: 20px;
  padding: 30px;

  p {
    text-align: center;
    width: 100%;
    font-weight: bold;
    color: #263238;
  }

  p#warning {
    font-size: 3.5rem;
  }

  p#redirect {
    font-size: 2rem;
  }

  @media (max-width: 1366px) {
    p#warning {
      font-size: 2.5rem;
    }

    p#redirect {
      font-size: 1.5rem;
    }

    button {
      width: 150px;
      font-size: 1rem;
    }
  }
`;

export const ImagePageNotFound = styled.img`
  width: 60vh;
  max-width: 100%;
`;
