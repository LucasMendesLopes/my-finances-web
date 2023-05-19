import { useState } from 'react';

import { useAuth } from '-src/hooks';
import { financesCollectionRef } from '-src/services/finances.service';
import { Checkbox, FormControlLabel, TextField } from '@mui/material';
import { addDoc, Timestamp } from 'firebase/firestore';

import Button from '../button/button';
import * as s from './styled-inputs-form';

const InputsForm = () => {
  const [description, setDescription] = useState('');
  const [value, setValue] = useState<number | ''>('');
  const [isEntrada, setIsEntrada] = useState(true);
  const [isSaida, setIsSaida] = useState(false);

  const { userUid } = useAuth();

  const clearInputs = () => {
    setDescription('');
    setValue('');
  };

  const handleAddFinance = async () => {
    const dateTimeStamp = Timestamp.fromDate(new Date());

    await addDoc(financesCollectionRef, {
      date: dateTimeStamp,
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

  return (
    <s.InputsFormContainer>
      <s.InputsContainer>
        <TextField
          type="text"
          label="Descrição"
          variant="outlined"
          value={description || ''}
          onChange={(e) => setDescription(e.target.value)}
        />

        <TextField
          type="number"
          label="Valor"
          variant="outlined"
          value={value || ''}
          inputProps={{ min: 1 }}
          onChange={(e) => setValue(Number(e.target.value))}
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
