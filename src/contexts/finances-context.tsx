import { createContext, Dispatch, SetStateAction, useContext } from 'react';

import { IFinance } from '-src/types';

interface FinancesContextType {
  isLoadingValues: boolean;
  finances: IFinance[];
  inflows: number;
  outflows: number;
  total: number;
  totalPages: number;
  yearAndMonth: string;
  setYearAndMonth: Dispatch<SetStateAction<string>>
  description: string;
  setDescription: Dispatch<SetStateAction<string>>
  handleGetFinances: (page: number, description: string, monthAndYear: string) => void;
}

export const FinancesContext = createContext<FinancesContextType>({
  isLoadingValues: false,
  finances: [],
  inflows: 0,
  outflows: 0,
  total: 0,
  totalPages: 0,
  yearAndMonth: "",
  setYearAndMonth: () => { },
  description: "",
  setDescription: () => { },
  handleGetFinances: () => { },
});

export const useFinances = (): FinancesContextType => {
  const context = useContext(FinancesContext);

  return context;
};
