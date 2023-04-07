import { ReactElement } from 'react';
import { type LoadingType } from 'react-loading';

export interface ICard {
  title: string;
  icon: ReactElement;
  isLoadingValues: boolean;
  value: number;
}

export interface IFinances {
  id: string;
  date: string;
  description: string;
  type: string;
  value: number;
}

export interface IFinancesTable {
  rows: IFinances[];
  isLoadingValues: boolean;
}

export interface ILoading {
  type: LoadingType;
  height?: number;
  width?: number;
}
