import styled from 'styled-components';

export const InputContainer = styled.div<{ type?: string }>`
  display: flex;
  flex-direction: column;
  gap: 10px;

  p.error-message {
    color: #b52121;
  }
`;
