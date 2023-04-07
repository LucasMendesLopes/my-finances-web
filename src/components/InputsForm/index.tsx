import { useState } from 'react';

import { financesCollectionRef } from '-services/finances';
import { Checkbox, FormControlLabel, TextField } from '@mui/material';
import { addDoc } from 'firebase/firestore';

import { Button, InputsFormContainer, InputsContainer } from './styles';

export const InputsForm = () => {
  const [description, setDescription] = useState('');
  const [value, setValue] = useState<number | ''>('');
  const [isEntrada, setIsEntrada] = useState(true);
  const [isSaida, setIsSaida] = useState(false);

  const clearInputs = () => {
    setDescription('');
    setValue('');
  };

  const handleAddFinance = async () => {
    const dateObj = new Date();
    const month = dateObj.getMonth() + 1;
    const day = dateObj.getDate();
    const year = dateObj.getFullYear();

    const newdate = `${day}/${month}/${year}`;

    await addDoc(financesCollectionRef, {
      date: newdate,
      description,
      type: isEntrada ? 'entrada' : 'saida',
      value,
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
    <InputsFormContainer>
      <InputsContainer>
        <TextField
          id="outlined-basic"
          type="text"
          label="Descrição"
          variant="outlined"
          value={description || ''}
          onChange={(e) => setDescription(e.target.value)}
        />

        <TextField
          id="outlined-basic"
          type="number"
          label="Valor"
          variant="outlined"
          value={value || ''}
          inputProps={{ min: 1 }}
          onChange={(e) => setValue(Number(e.target.value))}
        />

        <FormControlLabel
          color="red"
          control={<Checkbox checked={isEntrada} onChange={handleCheckbox} />}
          label="entrada"
        />

        <FormControlLabel
          control={<Checkbox checked={isSaida} onChange={handleCheckbox} />}
          label="saída"
        />
      </InputsContainer>

      <Button
        onClick={handleAddFinance}
        disabled={!description || !value || value < 1}
      >
        Adicionar
      </Button>
    </InputsFormContainer>
  );
};
