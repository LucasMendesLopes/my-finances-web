import { Control, Controller } from 'react-hook-form';

import {
  DatePickerProps,
  LocalizationProvider,
  DatePicker as XDatePicker,
} from '@mui/x-date-pickers';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import ptBR from 'date-fns/locale/pt-BR';

type IDateInput = {
  name: string;
  control: Control<any>;
  errorMessage?: string;
  defaultValue?: Date | null;
  fullwidth?: boolean;
} & DatePickerProps<any>;

export const DateInput = ({
  name,
  control,
  errorMessage,
  defaultValue,
  fullwidth = false,
  ...props
}: IDateInput) => {
  const handleChange = (date: Date, onChange: (date: Date) => void) => {
    onChange(date);
  };

  return (
    <Controller
      name={name}
      control={control}
      defaultValue={defaultValue}
      render={({ field: { value, onChange } }) => (
        <LocalizationProvider dateAdapter={AdapterDateFns} adapterLocale={ptBR}>
          <XDatePicker
            slotProps={{
              popper: { placement: 'auto' },
              textField: {
                error: !!errorMessage,
                helperText: errorMessage,
                fullWidth: true,
                sx: {
                  '.MuiFormHelperText-root': {
                    position: 'absolute',
                    margin: '3.7rem 0 0',
                  },
                },
              },
            }}
            onChange={(e) => handleChange(e, onChange)}
            value={value || null}
            {...props}
          />
        </LocalizationProvider>
      )}
    />
  );
};
