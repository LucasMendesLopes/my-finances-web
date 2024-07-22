import { colors } from '-src/styles/theme';
import styled from 'styled-components';

export const Container = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  gap: 2rem;
  padding: 3rem 3rem 3rem 128px;
  background-color: #e6e6e6;

  h1 {
    font-size: 2rem;
  }
`;

export const FiltersFormContainer = styled.form`
  display: flex;
  width: 100%;
  gap: 1rem;

  @media (max-width: 1100px) {
    flex-direction: column;

    button {
      max-width: 100%;
    }
  }
`;

export const InputsFormContainer = styled.div`
  max-width: 50%;
  display: flex;
  gap: 1rem;

  @media (max-width: 1100px) {
    max-width: 100%;
  }

  @media (max-width: 550px) {
    flex-direction: column;
  }
`;

export const ButtonsFormContainer = styled.div`
  max-width: 50%;
  display: flex;
  gap: 1rem;

  button {
    width: 14rem;
  }

  @media (max-width: 1100px) {
    max-width: 100%;

    button {
      width: 100%;
    }
  }

  @media (max-width: 550px) {
    flex-direction: column;
  }
`;

export const SideBar = styled.div`
  width: 20%;
  height: 100%;
  background-color: ${colors.grey100};
`;
