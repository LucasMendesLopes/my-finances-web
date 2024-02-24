import { useEffect, useState } from 'react';

import {
  CustomButton,
  FinancesTable,
  ModalAddFinance,
  ValueCards,
} from '-src/components/index';
import { useAuth, useFinances } from '-src/hooks';
import { DatePicker, LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import { ptBR } from 'date-fns/locale';
import { SignOut } from 'phosphor-react';

import * as s from './styled-home';

const Home = () => {
  const [modalAddFinanceIsOpen, setModalAddFinanceIsOpen] = useState(false);
  const [defaultDate, setDefaultDate] = useState<Date>(new Date());

  const formattedYearAndMonth = defaultDate.toISOString().slice(0, 7);

  const { signOut } = useAuth();

  const {
    handleGetFinances,
    finances,
    inflows,
    isLoadingValues,
    outflows,
    total,
  } = useFinances();

  useEffect(() => {
    handleGetFinances(formattedYearAndMonth);
  }, [defaultDate]);

  return (
    <s.Container>
      <s.Header>
        <SignOut
          alt="sair"
          id="logout-button"
          onClick={signOut}
          size={25}
          weight="regular"
        />
      </s.Header>

      <s.ElementsContainer>
        <s.NewTransactionContainer>
          <h1>Finanças</h1>

          <CustomButton
            text="Nova transação"
            onClick={() => setModalAddFinanceIsOpen(true)}
            sx={{ maxWidth: '14rem' }}
          />
        </s.NewTransactionContainer>

        <ValueCards
          inflows={inflows}
          outflows={outflows}
          total={total}
          isLoadingValues={isLoadingValues}
        />

        <ModalAddFinance
          isOpen={modalAddFinanceIsOpen}
          setIsOpen={setModalAddFinanceIsOpen}
          yearAndMonth={formattedYearAndMonth}
        />

        <LocalizationProvider adapterLocale={ptBR} dateAdapter={AdapterDateFns}>
          <DatePicker
            sx={{ marginRight: 'auto' }}
            slotProps={{ textField: { placeholder: '' } }}
            views={['month', 'year']}
            label="Mês e Ano"
            value={defaultDate}
            onAccept={(value) => value && setDefaultDate(value)}
          />
        </LocalizationProvider>

        <FinancesTable
          rows={finances}
          isLoadingValues={isLoadingValues}
          yearAndMonth={formattedYearAndMonth}
        />
      </s.ElementsContainer>
    </s.Container>
  );
};

export default Home;
