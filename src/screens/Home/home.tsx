import { useEffect, useState } from 'react';

import {
  CustomButton,
  FinancesTable,
  ModalAddFinance,
  ValueCards,
} from '-src/components/index';
import { useAuth } from '-src/hooks';
import { financesCollectionRef } from '-src/services/finances.service';
import { IFinances } from '-src/types';
import { onSnapshot, orderBy, query, where } from 'firebase/firestore';
import { SignOut } from 'phosphor-react';

import * as s from './styled-home';

const Home = () => {
  const [isLoadingValues, setIsLoadingValues] = useState(false);
  const [modalAddFinanceIsOpen, setModalAddFinanceIsOpen] = useState(false);
  const [finances, setFinances] = useState<IFinances[]>([]);

  const { logout, userUid, isSigned } = useAuth();

  useEffect(() => {
    if (userUid) {
      setIsLoadingValues(true);

      const q = query(
        financesCollectionRef,
        where('userUid', '==', userUid),
        orderBy('date', 'desc')
      );

      const subscribe = onSnapshot(q, (resp) => {
        const array: IFinances[] = [];

        resp.docs.forEach((doc) => {
          const dateFormated = new Date(
            doc.data().date.seconds * 1000
          ).toLocaleDateString();

          array.push({
            id: doc.id,
            date: dateFormated,
            description: doc.data().description,
            type: doc.data().type,
            value: doc.data().value,
          });
        });

        setFinances(array);
        setIsLoadingValues(false);
      });

      return () => subscribe();
    }
  }, [isSigned]);

  const cashInflows = finances
    ?.filter((item: IFinances) => item.type === 'entrada')
    .reduce((n: number, { value }: any) => n + value, 0);

  const cashOutflows = finances
    ?.filter((item: IFinances) => item.type === 'saida')
    .reduce((n: number, { value }: any) => n + value, 0);

  const total = cashInflows - cashOutflows;

  return (
    <s.Container>
      <s.Header>
        <SignOut
          alt="sair"
          id="logout-button"
          onClick={logout}
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
          cashInflows={cashInflows}
          cashOutflows={cashOutflows}
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
