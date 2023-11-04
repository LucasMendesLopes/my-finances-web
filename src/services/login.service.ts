import { api } from '-src/api/api';

export interface ILoginResp {
  message: string;
  accessToken: string;
  refreshToken: string;
}

const login = (email: string, password: string): Promise<ILoginResp> => {
  return new Promise((resolve, reject) => {
    api
      .post('/auth/signIn', { email, password })
      .then((resp) => {
        return resolve(resp.data);
      })
      .catch((error) => {
        reject(error);
      });
  });
};

const register = (email: string, password: string): Promise<string> => {
  return new Promise((resolve, reject) => {
    api
      .post('/auth/signUp', { email, password })
      .then((resp) => {
        return resolve(resp.data.message);
      })
      .catch((error) => reject(error.response.data.message));
  });
};

const refreshToken = (token: string): Promise<ILoginResp> => {
  return new Promise((resolve, reject) => {
    api
      .post('/refresh-token', { token })
      .then((resp) => {
        return resolve(resp.data);
      })
      .catch((error) => {
        reject(error);
      });
  });
};

export { login, register, refreshToken };
