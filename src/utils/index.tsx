import { yupGeneralSchema } from './yup';

const formatNumber = (number: number) => {
  return number?.toLocaleString('pt-br', { minimumFractionDigits: 2 });
};

export { yupGeneralSchema, formatNumber };
