import { colors } from '-src/styles/theme';
import styled from 'styled-components';

export const InputContainer = styled.div<{ type?: string }>`
  display: flex;
  flex-direction: column;
  gap: 10px;

  p.error-message {
    color: ${colors.red};
  }
`;
