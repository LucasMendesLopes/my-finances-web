import { ChangeEvent } from 'react';
import { Control, Controller } from 'react-hook-form';

import { ILoginFormInputs } from '-src/screens/login/login';
import { IRegisterFormInputs } from '-src/screens/register/register';
import { TextField } from '@mui/material';

import * as s from './styled-input-text';

interface IInputEmailProps {
  name: 'email' | 'confirmEmail';
  label: string;
  control: Control<ILoginFormInputs | IRegisterFormInputs | any>;
  rules?: object;
  error: string | undefined;
}

const InputEmail = ({
  name,
  label,
  control,
  rules,
  error,
}: IInputEmailProps) => {
  const handleChange = (
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
    onChange: (text: string) => void
  ) => {
    const text = e.target.value;
    onChange(text);
  };

  return (
    <Controller
      name={name}
      control={control}
      rules={rules}
      render={({ field: { value, onChange } }) => (
        <s.InputContainer>
          <TextField
            size="small"
            fullWidth
            type="text"
            label={label}
            variant="outlined"
            onChange={(e) => handleChange(e, onChange)}
            value={value}
          />
          {error && <p className="error-message">{error}</p>}
        </s.InputContainer>
      )}
    />
  );
};

export default InputEmail;
