import { colors } from '-src/styles/theme';
import styled from 'styled-components';

export const TableElementsContainer = styled.div<{ isLoadingValues: boolean }>`
  width: 100%;
  min-height: 115px;
  display: flex;
  align-items: center;
  justify-content: center;
  ${({ isLoadingValues }) => isLoadingValues && 'padding: 10px'};
  border-radius: 7px;
  background-color: ${colors.white};
  box-shadow: 0 6px 15px 1px grey;

  .MuiTableContainer-root {
    border-radius: 7px;
    overflow-x: hidden;
  }

  .MuiTableCell-root {
    white-space: nowrap;
  }

  @media (max-width: 800px) {
    .MuiTableContainer-root {
      overflow-x: auto;
    }

    .MuiTableCell-root {
      font-size: 1.05rem;
    }
  }
`;

export const EmptyTableText = styled.p`
  color: ${colors.grey200};
  font-size: 2rem;
  font-weight: 600;
`;

export const ButtonsContainer = styled.div`
  display: flex;
  gap: 2rem;

  @media (max-width: 950px) {
    margin-left: 32px;
    transform: translateX(0);
  }
`;
