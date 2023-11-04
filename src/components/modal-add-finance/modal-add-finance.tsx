import { Dispatch, SetStateAction, useState } from 'react';
import { useForm } from 'react-hook-form';
import toast from 'react-hot-toast';

import { CustomButton, DateInput, Input } from '-components/index';
import { useAuth } from '-src/hooks';
import { addFinance } from '-src/services/finance.service';
import { yupGeneralSchema } from '-src/utils/yup';
import { yupResolver } from '@hookform/resolvers/yup';
import { Checkbox, FormControlLabel } from '@mui/material';
import * as yup from 'yup';

import { BaseModal } from '../base-modal/base-modal';
import * as s from './styles';

interface IFinance {
  date: Date;
  description: string;
  value: number;
}

interface IModalAddFinace {
  isOpen: boolean;
  setIsOpen: Dispatch<SetStateAction<boolean>>;
}

const addFinanceSchema = yup
  .object({
    date: yupGeneralSchema.date,
    description: yupGeneralSchema.description,
    value: yupGeneralSchema.value,
  })
  .required();

export const ModalAddFinance = ({ isOpen, setIsOpen }: IModalAddFinace) => {
  const [isEntrada, setIsEntrada] = useState(true);
  const [isSaida, setIsSaida] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const { userId } = useAuth();

  const {
    handleSubmit,
    control,
    formState: { errors },
    reset,
  } = useForm<IFinance>({
    resolver: yupResolver(addFinanceSchema),
  });

  const clearInputs = () => {
    reset({});
  };

  const onSubmit = async (dataFields: IFinance) => {
    setIsLoading(true);

    const { date, description, value } = dataFields;

    const financeType = isEntrada ? 'entrada' : 'saida';

    const body = {
      date,
      description,
      type: financeType,
      value,
      userId,
    };

    addFinance(body)
      .then((resp) => {
        toast.success(resp);
      })
      .catch((error) => {
        toast.error(error);
      })
      .finally(() => {
        setIsLoading(false);
        setIsOpen(false);
        clearInputs();
      });
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
      title="Cadastrar transação"
      isOpen={isOpen}
      onClose={() => !isLoading && handleClose()}
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
            type="number"
            errorMessage={errors.value?.message}
            control={control}
          />

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
            disabled={isLoading}
            onClick={handleClose}
          />

          <CustomButton text="Cadastrar" isLoading={isLoading} type="submit" />
        </s.ButtonsContainer>
      </s.Form>
    </BaseModal>
  );
};
