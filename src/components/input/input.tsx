import { ChangeEvent } from 'react';
import { Control, Controller } from 'react-hook-form';

import { TextField, TextFieldProps } from '@mui/material';

type IInput = {
  name: string;
  control: Control<any>;
  errorMessage?: string;
  defaultValue?: string | null;
  width?: string;
} & TextFieldProps;

export const Input = ({
  name,
  control,
  errorMessage,
  defaultValue,
  width,
  ...props
}: IInput) => {
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
      defaultValue={defaultValue}
      render={({ field: { value, onChange } }) => (
        <TextField
          fullWidth
          type="text"
          sx={{
            '.MuiFormHelperText-root': {
              position: 'absolute',
              margin: '3.7rem 0 0',
            },
          }}
          variant="outlined"
          onChange={(e) => handleChange(e, onChange)}
          value={value || ''}
          color={errorMessage ? 'error' : 'primary'}
          error={!!errorMessage && true}
          helperText={errorMessage}
          {...props}
        />
      )}
    />
  );
};
