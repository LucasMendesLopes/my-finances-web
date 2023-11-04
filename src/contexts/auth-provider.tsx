import { useEffect, useState } from 'react';
import toast from 'react-hot-toast';
import { decodeToken } from 'react-jwt';

import { login } from '-src/services';

import { AuthContext } from './auth-context';

export const AuthProvider = ({ children }: { children: JSX.Element }) => {
  const [authenticated, setAuthenticated] = useState(false);
  const [isLoadingSign, setIsLoadingSign] = useState(false);
  const [userId, setUserId] = useState<string>('');

  const token = localStorage.getItem('token');

  useEffect(() => {
    if (token) {
      setAuthenticated(true);

      const user = decodeToken(token) as { id: string };
      setUserId(user.id);
    } else {
      setAuthenticated(false);
    }
  }, []);

  const signIn = (email: string, password: string) => {
    setIsLoadingSign(true);

    login(email, password)
      .then(async (resp) => {
        setAuthenticated(true);
        localStorage.setItem('token', resp.accessToken);

        const user = decodeToken(resp.accessToken) as { id: string };

        setUserId(user.id);

        toast.success('Seja bem vindo(a).');
      })
      .catch((error: any) => {
        toast.error(error.response.data.message);
      })
      .finally(() => {
        setIsLoadingSign(false);
      });
  };

  const signOut = () => {
    localStorage.removeItem('token');
    setAuthenticated(false);
    setUserId('');
  };

  return (
    <AuthContext.Provider
      value={{ authenticated, isLoadingSign, signIn, signOut, userId }}
    >
      {children}
    </AuthContext.Provider>
  );
};
