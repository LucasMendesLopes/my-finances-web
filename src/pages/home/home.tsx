import { useEffect, useState } from 'react';

import {
  CustomButton,
  FinancesTable,
  ModalAddFinance,
  ValueCards,
} from '-src/components/index';
import { useAuth, useFinances } from '-src/hooks';
import { SignOut } from 'phosphor-react';

import * as s from './styled-home';

const Home = () => {
  const [modalAddFinanceIsOpen, setModalAddFinanceIsOpen] = useState(false);

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
    handleGetFinances();
  }, []);

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
        />

        <FinancesTable rows={finances} isLoadingValues={isLoadingValues} />
      </s.ElementsContainer>
    </s.Container>
  );
};

export default Home;
