import { Dispatch, SetStateAction, useState } from 'react';
import { useForm } from 'react-hook-form';
import toast from 'react-hot-toast';

import { CustomButton, Input } from '-components/index';
import { useAuth, useCategories } from '-src/hooks';
import { addCategory } from '-src/services';
import { noWhiteSpaceRegex, requiredFieldMessage, whiteSpaceText } from '-src/utils/yup';
import { yupResolver } from '@hookform/resolvers/yup';
import { Checkbox, FormControlLabel } from '@mui/material';
import * as yup from 'yup';

import { BaseModal } from '../base-modal/base-modal';
import * as s from './styles';

interface ICategoryFormValues {
  name: string;
  color: string;
}

interface IModalAddCategory {
  isOpen: boolean;
  setIsOpen: Dispatch<SetStateAction<boolean>>;
  setPage: Dispatch<SetStateAction<number>>;
}

const addCategorySchema = yup
  .object({
    name: yup
      .string()
      .required(requiredFieldMessage)
      .matches(noWhiteSpaceRegex, whiteSpaceText),
    color: yup
      .string()
      .required(requiredFieldMessage)
  })
  .required();

export const ModalAddCategory = ({
  isOpen,
  setIsOpen,
  setPage,
}: IModalAddCategory) => {
  const [isEntrada, setIsEntrada] = useState(true);
  const [isSaida, setIsSaida] = useState(false);
  const [isLoadingAddCategory, setIsLoadingAddCategory] = useState(false);

  const { userId } = useAuth();

  const { handleGetCategories } = useCategories();

  const {
    handleSubmit,
    control,
    formState: { errors },
    reset,
  } = useForm<ICategoryFormValues>({
    resolver: yupResolver(addCategorySchema),
  });

  const clearInputs = () => {
    reset({});
  };

  const onSubmit = async (dataFields: ICategoryFormValues) => {
    setIsLoadingAddCategory(true);

    const { name, color } = dataFields;

    const categoryType = isEntrada ? 'entrada' : 'saida';

    const body = {
      name,
      color,
      type: categoryType,
      userId,
    };

    await addCategory(body)
      .then((resp) => {
        toast.success(resp);
      })
      .catch((error) => {
        toast.error(error);
      })
      .finally(() => {
        setIsLoadingAddCategory(false);
        setIsOpen(false);
        clearInputs();
      });

    setPage(1);
    handleGetCategories(1);
  };

  const handleCheckbox = () => {
    if (isEntrada) {
      setIsEntrada(false);
      setIsSaida(true);
    } else {
      setIsEntrada(true);
      setIsSaida(false);
    }
  };

  const handleClose = () => {
    setIsOpen(false);
    clearInputs();
  };

  return (
    <BaseModal
      width="33.5rem"
      maxWidth="90%"
      title="Cadastrar categoria"
      isOpen={isOpen}
      onClose={() => !isLoadingAddCategory && handleClose()}
    >
      <s.Form onSubmit={handleSubmit(onSubmit)}>
        <s.InputsContainer>
          <div style={{ display: "flex", gap: '1rem' }}>
            <Input
              name="name"
              label="Nome"
              control={control}
              errorMessage={errors.name?.message}
            />

            <Input
              name="color"
              defaultValue="#000000"
              type='color'
              control={control}
              errorMessage={errors.color?.message}
              sx={{ width: "20%" }}
            />
          </div>

          <div>
            <FormControlLabel
              color="red"
              control={
                <Checkbox checked={isEntrada} onChange={handleCheckbox} />
              }
              label="entrada"
            />

            <FormControlLabel
              control={<Checkbox checked={isSaida} onChange={handleCheckbox} />}
              label="saída"
            />
          </div>
        </s.InputsContainer>

        <s.ButtonsContainer>
          <CustomButton
            text="Cancelar"
            variant="outlined"
            disabled={isLoadingAddCategory}
            onClick={handleClose}
          />

          <CustomButton
            text="Cadastrar"
            isLoading={isLoadingAddCategory}
            type="submit"
          />
        </s.ButtonsContainer>
      </s.Form>
    </BaseModal>
  );
};
