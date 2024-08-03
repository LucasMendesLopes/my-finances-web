import { Dispatch, SetStateAction, useState } from 'react';
import { useForm } from 'react-hook-form';
import toast from 'react-hot-toast';

import { CustomButton, DateInput, Input } from '-components/index';
import { useCategories, useFinances } from '-src/hooks';
import { editFinance } from '-src/services/finance.service';
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
interface IDefaultValues {
  _id: string;
  date: string;
  description: string;
  value: string;
  category: string;
}

interface IModalEditFinance {
  isOpen: boolean;
  setIsOpen: Dispatch<SetStateAction<boolean>>;
  setPage: Dispatch<SetStateAction<number>>;
  modalDefaultValues: IDefaultValues;
  setModalDefaultValues: Dispatch<SetStateAction<any>>;
}

const addFinanceSchema = yup
  .object({
    date: yupGeneralSchema.date,
    description: yupGeneralSchema.description,
    value: yupGeneralSchema.value,
    category: yup.string().required(requiredFieldMessage),
  })
  .required();

export const ModalEditFinance = ({
  isOpen,
  setIsOpen,
  setPage,
  modalDefaultValues,
  setModalDefaultValues,
}: IModalEditFinance) => {
  const [isLoadingEditFinance, setIsLoadingEditFinance] = useState(false);

  const { handleGetFinances, yearAndMonth, setDescription } = useFinances();
  const { categories } = useCategories();

  const categoryOptions = categories.map(category => ({
    label: category.name,
    value: category._id
  }));

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
      description: modalDefaultValues.description,
      value: modalDefaultValues.value,
      category: modalDefaultValues.category
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

    const { date, description, value, category } = dataFields;

    const selectedCategory = categories.find(cat => cat._id === category);

    const normalizedValue = value.replace(/\./g, '').replace(',', '.');

    const formatedValue = parseFloat(normalizedValue);

    const body = {
      date,
      description,
      value: formatedValue,
      financeId: modalDefaultValues?._id,
      category: selectedCategory
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
    setDescription("")
    handleGetFinances(1, "", yearAndMonth);
  };

  const handleClose = () => {
    clearInputs();
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
