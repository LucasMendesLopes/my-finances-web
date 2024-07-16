import { yupGeneralSchema } from './yup';

const formatNumber = (number: number) => {
  return number?.toLocaleString('pt-br', { minimumFractionDigits: 2 });
};

const formatDateToYearAndMonth = (date: Date | null) => {
  return date?.toISOString().slice(0, 7) || ''
}

const maskCurrency = (value: string | undefined) => {
  value = value?.replace(/[^\d]/g, '');

  if (!value || isNaN(Number(value))) return '';

  value = value.replace(/^0+/, '');

  const integerPart = value.slice(0, -2) || '0';
  const decimalPart = value.slice(-2).padStart(2, '0');

  const formattedIntegerPart = integerPart.replace(
    /(\d)(?=(\d{3})+(?!\d))/g,
    '$1.'
  );

  return `${formattedIntegerPart},${decimalPart}`;
};

export { yupGeneralSchema, formatNumber, maskCurrency, formatDateToYearAndMonth };
