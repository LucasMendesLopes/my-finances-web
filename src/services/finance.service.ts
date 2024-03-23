import { api } from '-src/api/api';
import { IFinance } from '-src/types';

interface IFinanceBody {
  date: Date;
  description: string;
  type: string;
  value: number;
  userId: string;
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
  yearAndMonth: string
): Promise<IFinanceResp> => {
  return new Promise((resolve, reject) => {
    api
      .get(`/finances/${userId}?yearAndMonth=${yearAndMonth}&&page=${page}`)
      .then((resp) => {
        return resolve(resp.data);
      })
      .catch((error) => {
        reject(error.response.data.message);
      });
  });
};

const addFinance = (body: IFinanceBody): Promise<string> => {
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

export { addFinance, getFinances, deleteFinance };
