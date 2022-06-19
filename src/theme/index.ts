import { createTheme, ThemeOptions } from '@mui/material';

const font = 'Inter';
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
      default: '#F5F5F5',
    },
    text: {
      secondary: '#757575',
      primary: '#323232',
      disabled: '#757575',
    },
  },
  typography: {
    fontFamily: 'Inter',
    fontSize: 10,
    body1: {
      fontSize: 10,
    },
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
    MuiTypography: {
      defaultProps: {
        fontFamily: font,
      },
    },
    MuiCardHeader: {
      styleOverrides: {
        root: {
          padding: '12px',
        },
      },
    },
    MuiPaper: {
      styleOverrides: {
        root: {
          boxShadow:
            '0px 0px 0px rgba(48, 49, 51, 0.04), 0px 4px 8px rgba(48, 49, 51, 0.08)',
          borderRadius: '8px',
        },
      },
    },
  },
  spacing: 12,
};

const theme = createTheme(themeOptions);

export default theme;
