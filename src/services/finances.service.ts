import { collection, deleteDoc, doc } from 'firebase/firestore';

import { db } from './firebase-config';

export const financesCollectionRef = collection(db, 'finances');

const deleteFinance = async (id: string) => {
  const financeDoc = doc(db, 'finances', id);
  await deleteDoc(financeDoc);
};

export { deleteFinance };
