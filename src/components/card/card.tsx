import { ReactElement } from 'react';
import ReactLoading from 'react-loading';

import { colors } from '-src/styles/theme';
import { formatNumber } from '-src/utils';
import Tooltip from '@mui/material/Tooltip';

import { Container, CardValue, TitleContainer } from './styled-card';

interface ICard {
  title: string;
  icon: ReactElement;
  isLoadingValues: boolean;
  value: number;
}

export const Card = ({ title, icon, isLoadingValues, value }: ICard) => {
  return (
    <Container>
      <TitleContainer>
        <h2 id="title">{title}</h2>

        <div id="icon">{icon}</div>
      </TitleContainer>

      <Tooltip placement="top" arrow title={formatNumber(value)}>
        <CardValue value={value}>
          {isLoadingValues ? (
            <ReactLoading
              type="spin"
              color={colors.blue}
              width={50}
              height={50}
            />
          ) : (
            `R$ ${formatNumber(value)}`
          )}
        </CardValue>
      </Tooltip>
    </Container>
  );
};
