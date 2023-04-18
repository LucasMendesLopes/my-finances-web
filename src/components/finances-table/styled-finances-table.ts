import styled from 'styled-components';


export const TableElementsContainer = styled.div<{ isLoadingValues: boolean }>`
  width: 100%;
  min-height: 115px;
  display: flex;
  align-items: center;
  justify-content: center;
  ${({ isLoadingValues }) => isLoadingValues && 'padding: 10px'};
  border-radius: 7px;
  background-color: #ffffff;
  box-shadow: 0 6px 15px 1px grey;

  .MuiTableContainer-root {
    border-radius: 7px;
    overflow-x: hidden;
  }
`;

export const EmptyTableSpan = styled.span`
  /* padding: 16px; */
  color: #39393a;
  font-size: 2rem;
  font-weight: 600;
`;

export const DeleteButton = styled.button<{ deleteOpacity: boolean }>`
  border: none;
  background-color: transparent;
  cursor: pointer;
  transition: all 0.5s ease;
  transform: translateX(${({ deleteOpacity }) => (deleteOpacity ? 0 : 100)}px);
`;
