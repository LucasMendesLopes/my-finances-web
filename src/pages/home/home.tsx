import { useEffect, useState } from 'react';
import { useForm, Controller } from 'react-hook-form';

import {
  CustomButton,
  FinancesTable,
  Input,
  ModalAddFinance,
  ValueCards,
} from '-src/components/index';
import { useAuth, useFinances } from '-src/hooks';
import { formatDateToYearAndMonth } from '-src/utils';
import { DatePicker, LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import { ptBR } from 'date-fns/locale';
import { SignOut } from 'phosphor-react';

import * as s from './styled-home';
interface FormData {
  date: Date | null;
  description: string;
}

export const Home = () => {
  const [modalAddFinanceIsOpen, setModalAddFinanceIsOpen] = useState(false);
  const [page, setPage] = useState(1);

  const { handleSubmit, control } = useForm<FormData>();

  const { signOut } = useAuth();

  const {
    handleGetFinances,
    finances,
    yearAndMonth,
    setYearAndMonth,
    description,
    setDescription
  } = useFinances();

  useEffect(() => {
    handleGetFinances(page, "", yearAndMonth);
  }, []);

  const onSubmit = async (dataFields: FormData) => {
    setPage(1);
    setYearAndMonth(formatDateToYearAndMonth(dataFields.date))

    handleGetFinances(1, description, formatDateToYearAndMonth(dataFields.date));
  };

  return (
    <s.Container>
      <s.Header>
        <SignOut
          alt="sair"
          id="logout-button"
          onClick={signOut}
          size={30}
          weight="regular"
        />
      </s.Header>

      <s.ElementsContainer>
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
            />
          </s.InputsFormContainer>

          <s.ButtonsFormContainer>
            <CustomButton type="submit" text="Filtrar" />

            <CustomButton
              text="Nova transação"
              onClick={() => setModalAddFinanceIsOpen(true)}
            />
          </s.ButtonsFormContainer>
        </s.FiltersFormContainer>

        <FinancesTable
          rows={finances}
          page={page}
          setPage={setPage}
        />
      </s.ElementsContainer>
    </s.Container>
  );
};
