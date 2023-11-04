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
}

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

const getFinances = (userId: string): Promise<IFinanceResp> => {
  return new Promise((resolve, reject) => {
    api
      .get(`/finances/${userId}`)
      .then((resp) => {
        return resolve(resp.data);
      })
      .catch((error) => {
        reject(error.response.data.message);
      });
  });
};

export { addFinance, getFinances };
