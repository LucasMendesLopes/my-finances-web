import { createTheme } from '@mui/material';

export const colors = {
  blue: '#297373',
  blue100: '#1f5e5e',
  blue200: '#174c4c',
  green: '#21b53e',
  grey: '#676767',
  grey100: '#575757',
  grey200: '#343434',
  red: '#b52121',
  white: '#ffffff',
};

declare module '@mui/material/styles' {
  interface TypographyVariants {
    'input-text'?: React.CSSProperties;
    'button-text'?: React.CSSProperties;
  }

  // allow configuration using `createTheme`
  interface TypographyVariantsOptions {
    'input-text'?: React.CSSProperties;
    'button-text'?: React.CSSProperties;
  }
}

declare module '@mui/material/Typography' {
  interface TypographyPropsVariantOverrides {
    'input-text': true;
    'button-text': true;
  }
}

export const theme = createTheme({
  components: {
    MuiTableCell: {
      styleOverrides: { root: { fontSize: '1.25rem', fontWeight: 500 } },
    },
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
  typography: {
    fontFamily: ['Work sans', 'sans-serif'].join(','),
    h2: {
      fontWeight: 600,
      fontSize: '1.5rem',
      lineHeight: '2rem',
    },
    'input-text': {
      fontSize: '1rem',
      fontWeight: 400,
      lineHeight: '1.5rem',
      letterSpacing: '.0094rem',
    },
    'button-text': {
      fontSize: '1rem',
      fontWeight: 600,
      lineHeight: '1.625rem',
      letterSpacing: '.029rem',
    },
  },
});
