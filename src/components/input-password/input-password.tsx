import { ChangeEvent } from 'react';
import { Control, Controller, useForm } from 'react-hook-form';

import { ILoginFormInputs } from '-src/screens/login/login';
import { IRegisterFormInputs } from '-src/screens/register/register';
import { InputAdornment, TextField } from '@mui/material';
import { EyeClosed, EyeSlash } from 'phosphor-react';

import * as s from './styled-input-password';

interface IInputPasswordProps {
  name: 'email' | 'password' | 'confirmEmail' | 'confirmPassword';
  label: string;
  control: Control<ILoginFormInputs | IRegisterFormInputs | any>;
  rules?: object;
  error: string | undefined;
}

const InputPassword = ({
  name,
  label,
  control,
  rules,
  error,
}: IInputPasswordProps) => {
  const { watch, setValue } = useForm();

  const viewPassword = watch('viewPassword', false);

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
            fullWidth
            type={viewPassword ? 'text' : 'password'}
            label={label}
            variant="outlined"
            onChange={(e) => handleChange(e, onChange)}
            value={value}
            InputProps={{
              endAdornment: (
                <InputAdornment position="end">
                  {' '}
                  {viewPassword ? (
                    <EyeSlash
                      style={{ cursor: 'pointer' }}
                      size={20}
                      onClick={() => setValue('viewPassword', !viewPassword)}
                    />
                  ) : (
                    <EyeClosed
                      style={{ cursor: 'pointer' }}
                      size={20}
                      onClick={() => setValue('viewPassword', !viewPassword)}
                    />
                  )}
                </InputAdornment>
              ),
            }}
          />
          {error && <p className="error-message">{error}</p>}
        </s.InputContainer>
      )}
    />
  );
};

export default InputPassword;
