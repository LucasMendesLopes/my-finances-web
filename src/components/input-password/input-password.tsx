import { ChangeEvent } from 'react';
import { Control, Controller, useForm } from 'react-hook-form';

import { ILoginFormInputs } from '-src/pages/login/login';
import { IRegisterFormInputs } from '-src/pages/register/register';
import { InputAdornment, TextField, TextFieldProps } from '@mui/material';
import { EyeClosed, EyeSlash } from 'phosphor-react';

type IInputPasswordProps = {
  name: 'password' | 'confirmPassword';
  control: Control<ILoginFormInputs | IRegisterFormInputs | any>;
  errorMessage?: string;
} & TextFieldProps;

export const InputPassword = ({
  name,
  control,
  errorMessage,
  ...props
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
      render={({ field: { value, onChange } }) => (
        <TextField
          fullWidth
          type={viewPassword ? 'text' : 'password'}
          variant="outlined"
          onChange={(e) => handleChange(e, onChange)}
          value={value || ''}
          sx={{
            '.MuiFormHelperText-root': {
              position: 'absolute',
              margin: '3.7rem 0 0',
            },
          }}
          error={!!errorMessage && true}
          helperText={errorMessage}
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
          {...props}
        />
      )}
    />
  );
};
