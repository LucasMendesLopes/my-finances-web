import { Card } from '-components/index';
import {
  ArrowCircleDown,
  ArrowCircleUp,
  CurrencyCircleDollar,
} from 'phosphor-react';

import { CardsContainer } from './styled-value-cards';
import { colors } from '-src/styles/theme';

interface IValueCards {
  cashInflows: number;
  cashOutflows: number;
  total: number;
  isLoadingValues: boolean;
}

export const ValueCards = ({
  cashInflows,
  cashOutflows,
  total,
  isLoadingValues,
}: IValueCards) => {
  const cards = [
    {
      title: 'Entradas',
      icon: (
        <ArrowCircleUp color={colors.green} size={'100%'} id="icon-entrada" />
      ),
      value: cashInflows,
    },
    {
      title: 'Saídas',
      icon: (
        <ArrowCircleDown color={colors.red} size={'100%'} id="icon-saida" />
      ),
      value: cashOutflows,
    },
    {
      title: 'Total',
      icon: <CurrencyCircleDollar color="#2161b5" size={'100%'} />,
      value: total || 0,
    },
  ];

  return (
    <CardsContainer>
      {cards.map((item, index) => (
        <Card
          key={item.title + index}
          isLoadingValues={isLoadingValues}
          title={item.title}
          icon={item.icon}
          value={item.value}
        />
      ))}
    </CardsContainer>
  );
};
