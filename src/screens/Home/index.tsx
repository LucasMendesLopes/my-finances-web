/* eslint-disable @typescript-eslint/await-thenable */
import { useEffect, useState } from 'react';

import { FinancesTable } from '-components/FinancesTable';
import { InputsForm } from '-components/InputsForm';
import { ValueCards } from '-components/ValueCards';
import { financesCollectionRef } from '-services/finances';
import { IFinances } from '-src/types';
import { onSnapshot } from 'firebase/firestore';

import * as s from './styled-home';

export const Home = () => {
  const [isLoadingValues, setIsLoadingValues] = useState(false);
  const [finances, setFinances] = useState<IFinances[]>([]);

  useEffect(() => {
    setIsLoadingValues(true);

    onSnapshot(financesCollectionRef, (resp) => {
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
  }, []);

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
