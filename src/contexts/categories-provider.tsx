import { useState } from 'react';
import toast from 'react-hot-toast';

import { getCategories } from '-src/services';
import { ICategory } from '-src/types';

import { useAuth } from './auth-context';
import { CategoriesContext } from './categories-context';

export const CategoriesProvider = ({ children }: { children: JSX.Element }) => {
  const [isLoadingGetCategories, setIsLoadingGetCategories] = useState(false);
  const [categories, setCategories] = useState<ICategory[]>([]);
  const [totalPages, setTotalPages] = useState<number>(0);

  const { userId } = useAuth();

  const handleGetCategories = (page: number) => {
    setIsLoadingGetCategories(true);

    getCategories(userId, page)
      .then((resp) => {
        setCategories(resp.categories);
        setTotalPages(resp.totalPages);
      })
      .catch((err) => {
        console.error('Erro na chamada da API:', err);
        toast.error(err);
      })
      .finally(() => {
        setIsLoadingGetCategories(false);
      });
  };

  return (
    <CategoriesContext.Provider
      value={{
        handleGetCategories,
        categories,
        isLoadingGetCategories,
        totalPages,
      }}
    >
      {children}
    </CategoriesContext.Provider>
  );
};
