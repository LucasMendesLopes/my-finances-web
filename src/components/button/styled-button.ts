import styled from 'styled-components';

import { IButton } from './button';

export const Button = styled.button<IButton>`
  font-size: 1rem;
  font-weight: bold;
  background-color: #1f5e5e;
  color: #ffffff;
  cursor: pointer;
  border-radius: 7px;
  width: ${({ width }) => width};
  height: ${({ height }) => height};
  transition: all 0.5s ease;
  display: flex;
  justify-content: center;
  align-items: center;

  :hover {
    background-color: #174c4c;
  }

  :disabled {
    cursor: not-allowed;
    background-color: #676767;
  }
`;
