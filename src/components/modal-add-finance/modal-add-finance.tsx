import { Dispatch, SetStateAction, useState } from 'react';
import { useForm } from 'react-hook-form';
import toast from 'react-hot-toast';

import { CustomButton, DateInput, Input } from '-components/index';
import { useAuth, useCategories, useFinances } from '-src/hooks';
import { addFinance } from '-src/services/finance.service';
import { maskCurrency } from '-src/utils';
import { requiredFieldMessage, yupGeneralSchema } from '-src/utils/yup';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';

import { BaseModal } from '../base-modal/base-modal';
import { InputSelect } from '../input-select/input-select';
import * as s from './styles';

interface IFinanceFormValues {
  date: Date;
  description: string;
  value: string;
  category: string
}

interface IModalAddFinance {
  isOpen: boolean;
  setIsOpen: Dispatch<SetStateAction<boolean>>;
  setPage: Dispatch<SetStateAction<number>>;
}

const addFinanceSchema = yup
  .object({
    date: yupGeneralSchema.date,
    description: yupGeneralSchema.description,
    value: yupGeneralSchema.value,
    category: yup.string().required(requiredFieldMessage),
  })
  .required();

export const ModalAddFinance = ({
  isOpen,
  setIsOpen,
  setPage,
}: IModalAddFinance) => {
  const [isLoadingAddFinance, setIsLoadingAddFinance] = useState(false);

  const { userId } = useAuth();
  const { handleGetFinances, yearAndMonth, setDescription } = useFinances();
  const { categories } = useCategories();

  const {
    handleSubmit,
    control,
    formState: { errors },
    reset,
  } = useForm<IFinanceFormValues>({
    resolver: yupResolver(addFinanceSchema),
  });

  const clearInputs = () => {
    reset({});
  };

  const onSubmit = async (dataFields: IFinanceFormValues) => {
    setIsLoadingAddFinance(true);

    const { date, description, value, category } = dataFields;

    const selectedCategory = categories.find(cat => cat._id === category);

    const normalizedValue = value.replace(/\./g, '').replace(',', '.');

    const formatedValue = parseFloat(normalizedValue);

    const body = {
      date,
      description,
      value: formatedValue,
      category: selectedCategory,
      userId,
    };

    await addFinance(body)
      .then((resp) => {
        toast.success(resp);
      })
      .catch((error) => {
        toast.error(error);
      })
      .finally(() => {
        setIsLoadingAddFinance(false);
        setIsOpen(false);
        clearInputs();
      });

    setPage(1);
    setDescription("")
    handleGetFinances(1, "", yearAndMonth);
  };

  const handleClose = () => {
    setIsOpen(false);
    clearInputs();
  };

  const categoryOptions = categories.map(category => ({
    label: category.name,
    value: category._id
  }));

  return (
    <BaseModal
      width="33.5rem"
      maxWidth="90%"
      title="Cadastrar transação"
      isOpen={isOpen}
      onClose={() => !isLoadingAddFinance && handleClose()}
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

          <InputSelect
            name="category"
            control={control}
            defaultValue=""
            label="Categoria"
            options={categoryOptions}
            errorMessage={errors.category?.message}
          />
        </s.InputsContainer>

        <s.ButtonsContainer>
          <CustomButton
            text="Cancelar"
            variant="outlined"
            disabled={isLoadingAddFinance}
            onClick={handleClose}
          />

          <CustomButton
            text="Cadastrar"
            isLoading={isLoadingAddFinance}
            type="submit"
          />
        </s.ButtonsContainer>
      </s.Form>
    </BaseModal>
  );
};
