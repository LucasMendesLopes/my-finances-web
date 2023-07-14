import { createTheme } from '@mui/material';

export const theme = createTheme({
  components: {
    MuiTextField: { defaultProps: { size: 'small' } },
    MuiTableCell: { styleOverrides: { root: { fontSize: '1rem' } } },
    MuiTooltip: {
      styleOverrides: {
        tooltip: {
          fontSize: '1rem',
        },
      },
    },
  },
  palette: {
    primary: {
      main: '#174c4c',
    },
  },
});

export const colors = {
  header: '#297373',
  button: '#1f5e5e',
  white: '#ffffff',
  darkRed: '#b52121',
};
