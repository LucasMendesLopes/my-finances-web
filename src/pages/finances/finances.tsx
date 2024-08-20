import { useEffect, useState } from 'react';
import { useForm, Controller } from 'react-hook-form';

import {
  CustomButton,
  FinancesTable,
  Input,
  ModalAddFinance,
  ValueCards,
} from '-src/components/index';
import { useCategories, useFinances } from '-src/hooks';
import { formatDateToYearAndMonth } from '-src/utils';
import { InputAdornment } from '@mui/material';
import { DatePicker, LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import { ptBR } from 'date-fns/locale';
import { X } from 'phosphor-react';

import * as s from './styled-finances';
import toast from 'react-hot-toast';

interface FormData {
  date: Date | null;
  description: string;
}

export const Finances = () => {
  const [modalAddFinanceIsOpen, setModalAddFinanceIsOpen] = useState(false);
  const [page, setPage] = useState(1);

  const { handleSubmit, control } = useForm<FormData>();

  const {
    handleGetFinances,
    finances,
    yearAndMonth,
    setYearAndMonth,
    description,
    setDescription
  } = useFinances();

  const {
    handleGetCategories,
    categories
  } = useCategories();

  useEffect(() => {
    if (finances.length === 0) {
      handleGetFinances(page, "", yearAndMonth);
    }
    handleGetCategories()
  }, []);

  const onSubmit = async (dataFields: FormData) => {
    setPage(1);
    setYearAndMonth(formatDateToYearAndMonth(dataFields.date))

    handleGetFinances(1, description, formatDateToYearAndMonth(dataFields.date));
  };

  const handleClearFilterDescription = () => {
    setDescription('')
    setPage(1);

    handleGetFinances(1, "", yearAndMonth);
  }

  const handleOpenModalAddFinance = () => {
    if (categories.length === 0) return toast.error('Cadastre ao menos uma categoria')

    setModalAddFinanceIsOpen(true)
  }

  return (
    <s.Container>
      <ValueCards />

      <ModalAddFinance
        isOpen={modalAddFinanceIsOpen}
        setIsOpen={setModalAddFinanceIsOpen}
        setPage={setPage}
      />

      <s.FiltersFormContainer onSubmit={handleSubmit(onSubmit)}>
        <s.InputsFormContainer>
          <LocalizationProvider adapterLocale={ptBR} dateAdapter={AdapterDateFns}>
            <Controller
              name="date"
              control={control}
              defaultValue={new Date()}
              render={({ field }) => (
                <DatePicker
                  {...field}
                  views={['month', 'year']}
                  label="Mês e Ano"
                  onChange={(value) => {
                    field.onChange(value);
                  }}
                  slotProps={{
                    textField: {
                      fullWidth: true,
                    },
                  }}
                />
              )}
            />
          </LocalizationProvider>

          <Input
            name="description"
            label="Descrição"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            control={control}
            InputProps={{
              endAdornment: (
                <InputAdornment position="end" sx={{ opacity: description ? 1 : 0, transition: "all 0.5s ease", pointerEvents: description ? "all" : "none" }}>
                  <X
                    style={{ cursor: 'pointer' }}
                    size={20}
                    onClick={handleClearFilterDescription}
                  />
                </InputAdornment>
              ),
            }}
          />
        </s.InputsFormContainer>

        <s.ButtonsFormContainer>
          <CustomButton type="submit" text="Filtrar" />

          <CustomButton
            text="Nova transação"
            onClick={handleOpenModalAddFinance}
          />
        </s.ButtonsFormContainer>
      </s.FiltersFormContainer>

      <FinancesTable
        rows={finances}
        page={page}
        setPage={setPage}
      />
    </s.Container>
  );
};
