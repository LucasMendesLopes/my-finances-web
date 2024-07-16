import { colors } from '-src/styles/theme';
import styled from 'styled-components';

export const Container = styled.div`
  position: absolute;
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  background-color: #e6e6e6;
  overflow: auto;
`;

export const Header = styled.div`
  position: absolute;
  width: 100%;
  height: 15rem;
  text-align: center;
  background-color: ${colors.blue};
  color: ${colors.white};
  padding-top: 20px;

  #logout-button {
    position: absolute;
    top: 20px;
    right: 23px;
    cursor: pointer;

    :hover {
      text-shadow: 0px 0px 5px 5px black;
      transition: all 0.5s ease;
    }
  }
`;

export const ElementsContainer = styled.div`
  position: absolute;
  width: 90%;
  display: flex;
  flex-direction: column;
  gap: 2rem;
  margin-top: 6rem;
  padding-bottom: 6rem;

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
