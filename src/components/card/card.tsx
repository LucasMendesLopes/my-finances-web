import { ReactElement } from 'react';

import { Loading } from '-components/index';
import { formatNumber } from '-src/utils';
import Tooltip from '@mui/material/Tooltip';

import { Container, CardValue, TitleContainer } from './styled-card';

interface ICard {
  title: string;
  icon: ReactElement;
  isLoadingValues: boolean;
  value: number;
}

const Card = ({ title, icon, isLoadingValues, value }: ICard) => {
  return (
    <Container>
      <TitleContainer>
        <span id="title">{title}</span>

        <div id="icon">{icon}</div>
      </TitleContainer>

      <Tooltip placement="top" arrow title={formatNumber(value)}>
        <CardValue value={value}>
          {isLoadingValues ? (
            <Loading type="spin" />
          ) : (
            `R$ ${formatNumber(value)}`
          )}
        </CardValue>
      </Tooltip>
    </Container>
  );
};

export default Card;
