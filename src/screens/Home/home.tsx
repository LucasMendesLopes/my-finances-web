import { useEffect, useState } from 'react';

import { FinancesTable, InputsForm, ValueCards } from '-src/components/index';
import { useAuth } from '-src/hooks';
import { financesCollectionRef } from '-src/services/finances.service';
import { IFinances } from '-src/types';
import { onSnapshot, query, where } from 'firebase/firestore';
import { SignOut } from 'phosphor-react';

import * as s from './styled-home';

const Home = () => {
  const [isLoadingValues, setIsLoadingValues] = useState(false);
  const [finances, setFinances] = useState<IFinances[]>([]);

  const { logout, userUid, isSigned } = useAuth();

  useEffect(() => {
    if (userUid) {
      setIsLoadingValues(true);
      const q = query(financesCollectionRef, where('userUid', '==', userUid));

      const subscribe = onSnapshot(q, (resp) => {
        const array: IFinances[] = [];

        resp.docs.forEach((doc) => {
          array.push({
            id: doc.id,
            date: doc.data().date,
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
        <h1>Finanças</h1>

        <SignOut
          alt="sair"
          id="logout-button"
          onClick={logout}
          size={25}
          weight="regular"
        />
      </s.Header>

      <s.ElementsContainer>
        <ValueCards
          cashInflows={cashInflows}
          cashOutflows={cashOutflows}
          total={total}
          isLoadingValues={isLoadingValues}
        />

        <InputsForm />

        <FinancesTable rows={finances} isLoadingValues={isLoadingValues} />
      </s.ElementsContainer>
    </s.Container>
  );
};

export default Home;
