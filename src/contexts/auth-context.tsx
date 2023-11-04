import { createContext, useContext } from 'react';

interface AuthContextType {
  authenticated: boolean;
  isLoadingSign: boolean;
  userId: string;
  signIn: (email: string, password: string) => void;
  signOut: () => void;
}

export const AuthContext = createContext<AuthContextType>(null!);

export const useAuth = (): AuthContextType => {
  const context = useContext(AuthContext);

  return context;
};
