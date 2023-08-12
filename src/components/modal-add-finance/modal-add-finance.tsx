import { Dispatch, SetStateAction, useState } from 'react';

import { CustomButton } from '-components/index';
import { useAuth } from '-src/hooks';
import { financesCollectionRef } from '-src/services/finances.service';
import { Checkbox, FormControlLabel, TextField } from '@mui/material';
import {
  LocalizationProvider,
  DatePicker as XDatePicker,
} from '@mui/x-date-pickers';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import { format } from 'date-fns';
import ptBR from 'date-fns/locale/pt-BR';
import { Timestamp, addDoc } from 'firebase/firestore';

import { BaseModal } from '../base-modal/base-modal';
import * as s from './styles';

interface IModalAddFinace {
  isOpen: boolean;
  setIsOpen: Dispatch<SetStateAction<boolean>>;
}

export const ModalAddFinance = ({ isOpen, setIsOpen }: IModalAddFinace) => {
  const [description, setDescription] = useState('');
  const [value, setValue] = useState<number | ''>('');
  const [isEntrada, setIsEntrada] = useState(true);
  const [isSaida, setIsSaida] = useState(false);
  const [dateValue, setDateValue] = useState(format(new Date(), 'MM/dd/yyyy'));
  const [isLoading, setIsLoading] = useState(false);

  const { userUid } = useAuth();

  const clearInputs = () => {
    setDescription('');
    setValue('');
  };

  const handleAddFinance = async () => {
    setIsLoading(true);

    await addDoc(financesCollectionRef, {
      date: Timestamp.fromDate(new Date(dateValue)),
      description,
      type: isEntrada ? 'entrada' : 'saida',
      value,
      userUid,
    });

    setIsLoading(false);
    setIsOpen(false);
    clearInputs();
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

  const handleChangeDate = (e: Date) => {
    const newDate = format(new Date(e), 'MM/dd/yyyy');
    setDateValue(newDate);
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
      <s.ElementsContainer>
        <s.InputsContainer>
          <LocalizationProvider
            dateAdapter={AdapterDateFns}
            adapterLocale={ptBR}
          >
            <XDatePicker
              slotProps={{
                popper: { placement: 'auto' },
              }}
              onChange={(e: any) => handleChangeDate(e)}
              defaultValue={new Date(dateValue)}
              value={new Date(dateValue)}
            />
          </LocalizationProvider>

          <TextField
            type="text"
            label="Descrição"
            variant="outlined"
            value={description || ''}
            onChange={(e: any) => setDescription(e.target.value)}
            fullWidth
          />

          <TextField
            type="number"
            label="Valor"
            variant="outlined"
            value={value || ''}
            inputProps={{ min: 1 }}
            onChange={(e: any) => setValue(Number(e.target.value))}
            fullWidth
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
            onClick={() => setIsOpen(false)}
          />

          <CustomButton
            text="Cadastrar"
            onClick={handleAddFinance}
            isLoading={isLoading}
          />
        </s.ButtonsContainer>
      </s.ElementsContainer>
    </BaseModal>
  );
};
