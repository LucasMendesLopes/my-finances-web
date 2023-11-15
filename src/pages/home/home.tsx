import { useEffect, useState } from 'react';
import toast from 'react-hot-toast';

import {
  CustomButton,
  FinancesTable,
  ModalAddFinance,
  ValueCards,
} from '-src/components/index';
import { useAuth } from '-src/hooks';
import { getFinances } from '-src/services';
import { IFinance } from '-src/types';
import { SignOut } from 'phosphor-react';

import * as s from './styled-home';

const Home = () => {
  const [isLoadingValues, setIsLoadingValues] = useState(false);
  const [modalAddFinanceIsOpen, setModalAddFinanceIsOpen] = useState(false);
  const [finances, setFinances] = useState<IFinance[]>([]);
  const [inflows, setInflows] = useState<number>(0);
  const [outflows, setOutflows] = useState<number>(0);
  const [total, setTotal] = useState<number>(0);

  const { signOut, userId } = useAuth();

  useEffect(() => {
    setIsLoadingValues(true);

    getFinances(userId)
      .then((resp) => {
        setFinances(resp.finances);
        setInflows(resp.inflows);
        setOutflows(resp.outflows);
        setTotal(resp.total);
      })
      .catch((err) => toast.error(err))
      .finally(() => setIsLoadingValues(false));
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
          setIsLoadingValues={setIsLoadingValues}
          setFinances={setFinances}
          setInflows={setInflows}
          setOutflows={setOutflows}
          setTotal={setTotal}
        />

        <FinancesTable rows={finances} isLoadingValues={isLoadingValues} />
      </s.ElementsContainer>
    </s.Container>
  );
};

export default Home;
