import { useState } from 'react';

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

import Button from '../button/button';
import * as s from './styled-inputs-form';

const InputsForm = () => {
  const [description, setDescription] = useState('');
  const [value, setValue] = useState<number | ''>('');
  const [isEntrada, setIsEntrada] = useState(true);
  const [isSaida, setIsSaida] = useState(false);
  const [dateValue, setDateValue] = useState(format(new Date(), 'MM/dd/yyyy'));

  const { userUid } = useAuth();

  const clearInputs = () => {
    setDescription('');
    setValue('');
  };

  const handleAddFinance = async () => {
    await addDoc(financesCollectionRef, {
      date: Timestamp.fromDate(new Date(dateValue)),
      description,
      type: isEntrada ? 'entrada' : 'saida',
      value,
      userUid,
    });

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

  return (
    <s.InputsFormContainer>
      <s.InputsContainer>
        <LocalizationProvider dateAdapter={AdapterDateFns} adapterLocale={ptBR}>
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
        />

        <TextField
          type="number"
          label="Valor"
          variant="outlined"
          value={value || ''}
          inputProps={{ min: 1 }}
          onChange={(e: any) => setValue(Number(e.target.value))}
        />

        <div id="checbox-container">
          <FormControlLabel
            color="red"
            control={<Checkbox checked={isEntrada} onChange={handleCheckbox} />}
            label="entrada"
          />

          <FormControlLabel
            control={<Checkbox checked={isSaida} onChange={handleCheckbox} />}
            label="saída"
          />
        </div>
      </s.InputsContainer>

      <Button
        onClick={handleAddFinance}
        disabled={!description || !value || value < 1}
      >
        Adicionar
      </Button>
    </s.InputsFormContainer>
  );
};

export default InputsForm;
