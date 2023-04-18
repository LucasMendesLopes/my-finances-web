import {
  createContext,
  ReactNode,
  useContext,
  useEffect,
  useState,
} from 'react';

import { auth } from '-src/services/firebase-config';
import { onAuthStateChanged, signOut } from 'firebase/auth';

interface AuthProviderProps {
  children: ReactNode;
}

interface IAuthContext {
  isLoading: boolean;
  isSigned: boolean;
  userUid: string | null;
  logout: () => void;
}

const AuthContext = createContext<IAuthContext>({} as IAuthContext);

const AuthProvider = ({ children }: AuthProviderProps) => {
  const [isLoading, setIsLoading] = useState(true);
  const [userUid, setUserUid] = useState(null);

  useEffect(() => {
    onAuthStateChanged(auth, (user: any) => {
      if (user) {
        setUserUid(user.uid);
      } else setUserUid(null);
      setIsLoading(false);
    });
  }, []);

  const logout = () => {
    signOut(auth);
  };

  return (
    <AuthContext.Provider
      value={{
        isLoading,
        isSigned: !!userUid,
        userUid,
        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;

export const useAuth = () => {
  const context = useContext(AuthContext);
  return context;
};
