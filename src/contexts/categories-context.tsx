import { createContext, useContext } from 'react';

import { ICategory } from '-src/types';

interface CategoriesContextType {
  isLoadingGetCategories: boolean;
  categories: ICategory[];
  totalPages: number;
  handleGetCategories: (page?: number) => void;
}

export const CategoriesContext = createContext<CategoriesContextType>({
  isLoadingGetCategories: false,
  categories: [],
  totalPages: 0,
  handleGetCategories: () => { },
});

export const useCategories = (): CategoriesContextType => {
  const context = useContext(CategoriesContext);

  return context;
};
