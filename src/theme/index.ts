import { createTheme, ThemeOptions } from '@mui/material';

export const themeOptions: ThemeOptions = {
  palette: {
    primary: {
      main: '#3f51b5',
    },
    secondary: {
      main: '#f50057',
    },
    background: {
      paper: '#ffffff',
      default: '#f5f5f5',
    },
    text: {
      secondary: '#757575',
      primary: '#323232',
      disabled: '#757575',
    },
  },
  typography: {
    fontFamily: 'Inter',
    fontSize: 16,
    fontWeightLight: 300,
    htmlFontSize: 20,
  },
  shape: {
    borderRadius: 12,
  },
  components: {
    MuiAppBar: {
      styleOverrides: {
        root: {
          backgroundColor: '#fff',
          color: '#323232',
        },
      },
    },
  },
  spacing: 8,
};

const theme = createTheme(themeOptions);

export default theme;
