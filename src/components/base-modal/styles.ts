import styled from 'styled-components';

export const ElementsContainer = styled.div<{
  width?: string;
  maxWidth?: string;
}>`
  position: absolute;
  width: ${({ width }) => width};
  max-width: ${({ maxWidth }) => maxWidth};
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  background-color: white;
  box-shadow: 0px 3px 10px rgba(38, 59, 94, 0.1);
  padding: 40px;
  border-radius: 8px;
`;

export const TitleContainer = styled.div`
  display: flex;
  align-items: start;
  gap: 24px;
`;
