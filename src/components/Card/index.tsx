import { ICard } from '-src/types';
import { formatNumber } from '-src/utils';

import { Loading } from '../Loading';
import { Container, CardValue, TitleContainer } from './styles';

export const Card = ({ title, icon, isLoadingValues, value }: ICard) => {
  return (
    <Container>
      <TitleContainer>
        <span id="title">{title}</span>

        <div id="icon">{icon}</div>
      </TitleContainer>

      <CardValue value={value}>
        {isLoadingValues ? (
          <Loading type="spin" />
        ) : (
          `R$ ${formatNumber(value)}`
        )}
      </CardValue>
    </Container>
  );
};
