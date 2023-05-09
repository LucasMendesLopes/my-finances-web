import { Toaster } from 'react-hot-toast';

import { ThemeProvider } from '@mui/material';

import { AuthProvider } from './contexts';
import Routes from './routes/routes';
import GlobalStyles from './styles/globalStyle';
import { theme } from './styles/theme';

function App() {
  return (
    <AuthProvider>
      <ThemeProvider theme={theme}>
        <Toaster position="top-center" />
        <GlobalStyles />
        <Routes />
      </ThemeProvider>
    </AuthProvider>
  );
}

export default App;
