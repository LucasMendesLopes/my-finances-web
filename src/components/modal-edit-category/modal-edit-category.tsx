import { Dispatch, SetStateAction, useState } from 'react';
import { useForm } from 'react-hook-form';
import toast from 'react-hot-toast';

import { CustomButton, Input } from '-components/index';
import { useCategories } from '-src/hooks';
import { editCategory } from '-src/services';
import { ICategory } from '-src/types';
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
interface IDefaultValues extends Omit<ICategory, 'userId'> { }

interface IModalEditCategory {
  isOpen: boolean;
  setIsOpen: Dispatch<SetStateAction<boolean>>;
  setPage: Dispatch<SetStateAction<number>>;
  modalDefaultValues: IDefaultValues;
  setModalDefaultValues: Dispatch<SetStateAction<any>>;
}

const editCategorySchema = yup
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

export const ModalEditCategory = ({
  isOpen,
  setIsOpen,
  setPage,
  modalDefaultValues,
  setModalDefaultValues,
}: IModalEditCategory) => {
  const [isEntrada, setIsEntrada] = useState(
    modalDefaultValues.type === 'entrada'
  );
  const [isSaida, setIsSaida] = useState(modalDefaultValues.type === 'saida');
  const [isLoadingEditCategory, setIsLoadingEditCategory] = useState(false);

  const { handleGetCategories } = useCategories();


  const {
    handleSubmit,
    control,
    formState: { errors },
    reset,
  } = useForm<ICategoryFormValues>({
    resolver: yupResolver(editCategorySchema),
    defaultValues: {
      name: modalDefaultValues.name,
      color: modalDefaultValues.color,
    },
    shouldUnregister: true,
  });

  const clearInputs = () => {
    setModalDefaultValues({});
    reset({});
  };

  const onSubmit = async (dataFields: ICategoryFormValues) => {
    clearInputs();
    setIsLoadingEditCategory(true);

    const { name, color } = dataFields;

    const categoryType = isEntrada ? 'entrada' : 'saida';



    const body = {
      name,
      color,
      type: categoryType,
      categoryId: modalDefaultValues?._id,
    };

    await editCategory(body)
      .then((resp) => {
        toast.success(resp);
      })
      .catch((error) => {
        toast.error(error);
      })
      .finally(() => {
        clearInputs();
        setIsLoadingEditCategory(false);
        setIsOpen(false);
      });

    setPage(1);
    handleGetCategories(1);
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
      onClose={() => !isLoadingEditCategory && handleClose()}
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
            disabled={isLoadingEditCategory}
            onClick={handleClose}
          />

          <CustomButton
            text="Editar"
            isLoading={isLoadingEditCategory}
            type="submit"
          />
        </s.ButtonsContainer>
      </s.Form>
    </BaseModal>
  );
};
