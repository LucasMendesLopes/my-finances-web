import styled from 'styled-components';

import { colors } from '../../styles/theme';

export const Container = styled.div`
  flex: 1;
  min-width: 10%;
  height: 150px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;
  background-color: ${colors.white};
  box-shadow: 0 6px 15px 1px grey;
  border-radius: 7px;
  padding: 30px;
`;

export const TitleContainer = styled.div`
  width: 100%;
  display: flex;
  justify-content: space-between;

  #title {
    color: ${colors.grey100};
    font-weight: bold;
    font-size: 1.2rem;
  }

  #icon {
    width: 25px;
    height: 25px;

    img {
      width: 100%;
    }
  }
`;

export const CardValue = styled.span<{ value?: number }>`
  color: ${({ value }) => (value && value < 0 ? colors.red : colors.grey200)};
  font-size: 2rem;
  font-weight: 600;
  text-overflow: ellipsis;
  white-space: nowrap;
  overflow: hidden;
  max-width: 100%;
`;
