import { Dispatch, SetStateAction, useState } from 'react';
import { useForm } from 'react-hook-form';
import toast from 'react-hot-toast';

import { CustomButton, DateInput, Input } from '-components/index';
import { useFinances } from '-src/hooks';
import { editFinance } from '-src/services/finance.service';
import { IFinance } from '-src/types';
import { maskCurrency } from '-src/utils';
import { yupGeneralSchema } from '-src/utils/yup';
import { yupResolver } from '@hookform/resolvers/yup';
import { Checkbox, FormControlLabel } from '@mui/material';
import * as yup from 'yup';

import { BaseModal } from '../base-modal/base-modal';
import * as s from './styles';

interface IFinanceFormValues {
  date: Date;
  description: string;
  value: string;
}

interface IDefaultValues extends Omit<IFinance, 'userId'> {}

interface IModalEditFinance {
  isOpen: boolean;
  setIsOpen: Dispatch<SetStateAction<boolean>>;
  yearAndMonth: string;
  setPage: Dispatch<SetStateAction<number>>;
  modalDefaultValues: IDefaultValues;
  setModalDefaultValues: Dispatch<SetStateAction<any>>;
}

const addFinanceSchema = yup
  .object({
    date: yupGeneralSchema.date,
    description: yupGeneralSchema.description,
    value: yupGeneralSchema.value,
  })
  .required();

export const ModalEditFinance = ({
  isOpen,
  setIsOpen,
  yearAndMonth,
  setPage,
  modalDefaultValues,
  setModalDefaultValues,
}: IModalEditFinance) => {
  const [isEntrada, setIsEntrada] = useState(
    modalDefaultValues.type === 'entrada'
  );
  const [isSaida, setIsSaida] = useState(modalDefaultValues.type === 'saida');
  const [isLoadingEditFinance, setIsLoadingEditFinance] = useState(false);

  const { handleGetFinances } = useFinances();

  const separateDate = modalDefaultValues.date.split('/');
  const formatedDate = `${separateDate[2]}, ${separateDate[1]}, ${separateDate[0]}`;

  const {
    handleSubmit,
    control,
    formState: { errors },
    reset,
  } = useForm<IFinanceFormValues>({
    resolver: yupResolver(addFinanceSchema),
    defaultValues: {
      date: new Date(formatedDate),
      description: modalDefaultValues?.description,
      value: modalDefaultValues?.value,
    },
    shouldUnregister: true,
  });

  const clearInputs = () => {
    setModalDefaultValues({});
    reset({});
  };

  const onSubmit = async (dataFields: IFinanceFormValues) => {
    clearInputs();
    setIsLoadingEditFinance(true);

    const { date, description, value } = dataFields;

    const financeType = isEntrada ? 'entrada' : 'saida';

    const normalizedValue = value.replace(/\./g, '').replace(',', '.');

    const formatedValue = parseFloat(normalizedValue);

    const body = {
      date,
      description,
      type: financeType,
      value: formatedValue,
      financeId: modalDefaultValues?._id,
    };

    await editFinance(body)
      .then((resp) => {
        toast.success(resp);
      })
      .catch((error) => {
        toast.error(error);
      })
      .finally(() => {
        clearInputs();
        setIsLoadingEditFinance(false);
        setIsOpen(false);
      });

    setPage(1);
    handleGetFinances(1, yearAndMonth);
  };

  const handleCheckbox = (checkboxType: string) => {
    if (checkboxType === 'entrada') {
      setIsEntrada(true);
      setIsSaida(false);
    } else {
      setIsEntrada(false);
      setIsSaida(true);
    }
  };

  const handleClose = () => {
    clearInputs();
    setIsEntrada((prev) => prev);
    setIsSaida((prev) => prev);
    setIsOpen(false);
  };

  return (
    <BaseModal
      width="33.5rem"
      maxWidth="90%"
      title="Editar transação"
      isOpen={isOpen}
      onClose={() => !isLoadingEditFinance && handleClose()}
    >
      <s.Form onSubmit={handleSubmit(onSubmit)}>
        <s.InputsContainer>
          <DateInput
            name="date"
            label="Escolha a data"
            control={control}
            errorMessage={errors.date?.message}
            fullwidth
          />

          <Input
            name="description"
            label="Descrição"
            control={control}
            errorMessage={errors.description?.message}
          />

          <Input
            name="value"
            label="Valor"
            errorMessage={errors.value?.message}
            control={control}
            mask={maskCurrency}
          />

          <div>
            <FormControlLabel
              control={
                <Checkbox
                  checked={isEntrada}
                  onChange={() => handleCheckbox('entrada')}
                  value="entrada"
                />
              }
              label="entrada"
            />

            <FormControlLabel
              control={
                <Checkbox
                  checked={isSaida}
                  onChange={() => handleCheckbox('saida')}
                  value="saida"
                />
              }
              label="saída"
            />
          </div>
        </s.InputsContainer>

        <s.ButtonsContainer>
          <CustomButton
            text="Cancelar"
            variant="outlined"
            disabled={isLoadingEditFinance}
            onClick={handleClose}
          />

          <CustomButton
            text="Editar"
            isLoading={isLoadingEditFinance}
            type="submit"
          />
        </s.ButtonsContainer>
      </s.Form>
    </BaseModal>
  );
};
