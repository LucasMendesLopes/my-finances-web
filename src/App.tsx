import { Toaster } from 'react-hot-toast';

import { AuthProvider } from './contexts';
import Routes from './routes/routes';
import GlobalStyles from './styles/globalStyle';

function App() {
  return (
    <AuthProvider>
      <Toaster position="top-center" />
      <GlobalStyles />
      <Routes />
    </AuthProvider>
  );
}

export default App;
