import { useState } from 'react';
import toast from 'react-hot-toast';

import { getFinances } from '-src/services';
import { IFinance } from '-src/types';

import { useAuth } from './auth-context';
import { FinancesContext } from './finances-context';

export const FinancesProvider = ({ children }: { children: JSX.Element }) => {
  const [isLoadingValues, setIsLoadingValues] = useState(false);
  const [finances, setFinances] = useState<IFinance[]>([]);
  const [inflows, setInflows] = useState<number>(0);
  const [outflows, setOutflows] = useState<number>(0);
  const [total, setTotal] = useState<number>(0);
  const [totalPages, setTotalPages] = useState<number>(0);

  const { userId } = useAuth();

  const handleGetFinances = (page: number, monthAndYear: string) => {
    setIsLoadingValues(true);

    getFinances(userId, page, monthAndYear)
      .then((resp) => {
        setFinances(resp.finances);
        setInflows(resp.inflows);
        setOutflows(resp.outflows);
        setTotal(resp.total);
        setTotalPages(resp.totalPages);
      })
      .catch((err) => {
        console.error('Erro na chamada da API:', err);
        toast.error(err);
      })
      .finally(() => {
        setIsLoadingValues(false);
      });
  };

  return (
    <FinancesContext.Provider
      value={{
        handleGetFinances,
        finances,
        inflows,
        isLoadingValues,
        outflows,
        total,
        totalPages,
      }}
    >
      {children}
    </FinancesContext.Provider>
  );
};
