import { Card } from '-components/index';
import { useFinances } from '-src/hooks';
import { colors } from '-src/styles/theme';
import {
  ArrowCircleDown,
  ArrowCircleUp,
  CurrencyCircleDollar,
} from 'phosphor-react';

import { CardsContainer } from './styled-value-cards';

export const ValueCards = () => {
  const { inflows, outflows, total, isLoadingValues } = useFinances()

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
