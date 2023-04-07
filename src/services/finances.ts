import { collection, deleteDoc, doc } from 'firebase/firestore';

import { db } from './firebase-config';

export const financesCollectionRef = collection(db, 'finances');

export const DeleteFinance = async (id: string) => {
  const financeDoc = doc(db, 'finances', id);
  await deleteDoc(financeDoc)
};
