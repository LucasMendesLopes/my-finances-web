export const formatNumber = (number: number) => {
  return number?.toLocaleString('pt-br', { minimumFractionDigits: 2 });
};
