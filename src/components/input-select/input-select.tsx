import { Control, Controller } from 'react-hook-form';

import { FormControl, InputLabel, MenuItem, Select, SelectProps, FormHelperText } from '@mui/material';

type IInputSelect = {
  name: string;
  control: Control<any>;
  errorMessage?: string;
  defaultValue?: string | null;
  options: Array<{ label: string, value: string }>;
  label: string;
} & SelectProps;

export const InputSelect = ({
  name,
  control,
  errorMessage,
  defaultValue,
  options,
  label,
  ...props
}: IInputSelect) => {
  return (
    <FormControl fullWidth error={!!errorMessage}>
      <InputLabel id={`${name}-label`}>{label}</InputLabel>
      <Controller
        name={name}
        control={control}
        defaultValue={defaultValue}
        render={({ field }) => (
          <Select
            {...field}
            labelId={`${name}-label`}
            label={label}

            {...props}
          >
            {options.map((option) => (
              <MenuItem key={option.value} value={option.value}>
                {option.label}
              </MenuItem>
            ))}
          </Select>
        )}
      />
      {errorMessage &&
        <FormHelperText sx={{
          position: 'absolute',
          margin: '3.7rem 0 0',
        }}>
          {errorMessage}
        </FormHelperText>}
    </FormControl >
  );
};