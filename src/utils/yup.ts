import * as yup from 'yup';

export const whiteSpaceText = 'Espaços em branco não são permitidos.';
export const requiredFieldMessage = 'Campo obrigatório*';
export const noWhiteSpaceRegex = /^(?!\s).+(?<!\s)$/gm;

export const yupGeneralSchema = {
  date: yup
    .date()
    .required(requiredFieldMessage)
    .typeError('Por favor, insira uma data válida.'),
  description: yup
    .string()
    .required(requiredFieldMessage)
    .matches(noWhiteSpaceRegex, whiteSpaceText),
  value: yup
    .string()
    .required(requiredFieldMessage)
    .typeError(requiredFieldMessage),
};
