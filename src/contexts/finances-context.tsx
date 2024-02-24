import { createContext, useContext } from 'react';

import { IFinance } from '-src/types';

interface FinancesContextType {
  isLoadingValues: boolean;
  finances: IFinance[];
  inflows: number;
  outflows: number;
  total: number;
  handleGetFinances: (monthAndYear: string) => void;
}

export const FinancesContext = createContext<FinancesContextType>({
  isLoadingValues: false,
  finances: [],
  inflows: 0,
  outflows: 0,
  total: 0,
  handleGetFinances: () => {},
});

export const useFinances = (): FinancesContextType => {
  const context = useContext(FinancesContext);

  return context;
};
