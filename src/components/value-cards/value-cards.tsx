import { Card } from '-components/index';
import { colors } from '-src/styles/theme';
import {
  ArrowCircleDown,
  ArrowCircleUp,
  CurrencyCircleDollar,
} from 'phosphor-react';

import { CardsContainer } from './styled-value-cards';

interface IValueCards {
  inflows: number;
  outflows: number;
  total: number;
  isLoadingValues: boolean;
}

export const ValueCards = ({
  inflows,
  outflows,
  total,
  isLoadingValues,
}: IValueCards) => {
  const cards = [
    {
      title: 'Entradas',
      icon: (
        <ArrowCircleUp color={colors.green} size={35} id="icon-entrada" />
      ),
      value: inflows,
    },
    {
      title: 'Saídas',
      icon: (
        <ArrowCircleDown color={colors.red} size={35} id="icon-saida" />
      ),
      value: outflows,
    },
    {
      title: 'Total',
      icon: <CurrencyCircleDollar color="#2161b5" size={35} />,
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
