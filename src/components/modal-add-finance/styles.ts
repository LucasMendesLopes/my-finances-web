import { colors } from '-src/styles/theme';
import styled from 'styled-components';

export const ElementsContainer = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  gap: 3rem;
  margin-top: 2.5rem;
`;

export const InputsFormContainer = styled.div`
  box-shadow: 0 6px 15px 1px grey;
  width: 100%;
  height: 9.375rem;
  background-color: ${colors.white};
  border-radius: 0.4375rem;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 1.875rem;
`;

export const InputsContainer = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  gap: 2.5rem;

  input:focus-visible {
    box-shadow: none !important;
  }
`;

export const ButtonsContainer = styled.div`
  display: flex;
  gap: 1rem;
`;
