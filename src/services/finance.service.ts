import { api } from '-src/api/api';
import { IFinance } from '-src/types';

interface IAddFinanceBody {
  date: Date;
  description: string;
  type: string;
  value: number;
  userId: string;
}

interface IEditFinanceBody extends Omit<IAddFinanceBody, 'userId'> {
  financeId: string;
}

interface IFinanceResp {
  finances: IFinance[] | [];
  inflows: number;
  outflows: number;
  total: number;
  totalPages: number;
}

const getFinances = (
  userId: string,
  page: number,
  description: string,
  yearAndMonth: string
): Promise<IFinanceResp> => {
  return new Promise((resolve, reject) => {
    api
      .get(
        `/finances/${userId}?yearAndMonth=${yearAndMonth}&&page=${page}&&description=${description}`
      )
      .then((resp) => {
        return resolve(resp.data);
      })
      .catch((error) => {
        reject(error.response.data.message);
      });
  });
};

const addFinance = (body: IAddFinanceBody): Promise<string> => {
  const { date, description, type, value, userId } = body;

  return new Promise((resolve, reject) => {
    api
      .post('/finances', { date, description, type, value, userId })
      .then((resp) => {
        return resolve(resp.data.message);
      })
      .catch((error) => {
        reject(error.response.data.message);
      });
  });
};

const editFinance = (body: IEditFinanceBody): Promise<string> => {
  const { date, description, type, value, financeId } = body;

  return new Promise((resolve, reject) => {
    api
      .put(`/finances/${financeId}`, { date, description, type, value })
      .then((resp) => {
        return resolve(resp.data.message);
      })
      .catch((error) => {
        reject(error.response.data.message);
      });
  });
};

const deleteFinance = (financeId: string): Promise<string> => {
  return new Promise((resolve, reject) => {
    api
      .delete(`/finances/${financeId}`)
      .then((resp) => {
        return resolve(resp.data.message);
      })
      .catch((error) => {
        reject(error.response.data.message);
      });
  });
};

export { addFinance, editFinance, getFinances, deleteFinance };
