import { Toaster } from 'react-hot-toast';

import { ThemeProvider } from '@mui/material';

import { AuthProvider, CategoriesProvider, FinancesProvider } from './contexts';
import { Routes } from './routes';
import { GlobalStyles } from './styles/globalStyle';
import { theme } from './styles/theme';

export function App() {
  return (
    <AuthProvider>
      <FinancesProvider>
        <CategoriesProvider>
          <ThemeProvider theme={theme}>
            <Toaster position="top-center" />
            <GlobalStyles />
            <Routes />
          </ThemeProvider>
        </CategoriesProvider>
      </FinancesProvider>
    </AuthProvider>
  );
}

