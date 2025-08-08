import { createTheme } from '@mui/material/styles';

const theme = createTheme({
  palette: {
    primary: {
      main: '#0052CC',
    },
    secondary: {
      main: '#172B4D',
    },
    success: {
      main: '#00875A',
    },
    error: {
      main: '#DE350B',
    },
    warning: {
      main: '#FFAB00',
    },
    background: {
      default: '#f4f6f8',
      paper: '#ffffff',
    },
  },
  typography: {
    fontFamily: '"Inter", "Helvetica", "Arial", sans-serif',
    fontWeightRegular: 400,
    fontWeightMedium: 500,
    fontWeightBold: 700,
    h1: {
      fontWeight: 700,
      fontSize: '2.5rem',
    },
    h2: {
      fontWeight: 700,
      fontSize: '2rem',
    },
    h3: {
      fontWeight: 600,
      fontSize: '1.75rem',
    },
    h4: {
      fontWeight: 600,
      fontSize: '1.5rem',
    },
    h5: {
      fontWeight: 500,
      fontSize: '1.25rem',
    },
    h6: {
      fontWeight: 500,
      fontSize: '1.1rem',
    },
  },
  shape: {
    borderRadius: 8,
  },
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          textTransform: 'none',
          borderRadius: '6px',
        },
      },
    },
    MuiPaper: {
      defaultProps: {
        elevation: 0,
      },
      styleOverrides: {
        root: {
          borderRadius: '12px',
        },
      },
    },
    MuiAppBar: {
        styleOverrides: {
            root: {
                backgroundColor: 'white',
                color: '#172B4D',
                boxShadow: 'none',
                borderBottom: '1px solid #e0e0e0'
            }
        }
    },
    MuiDrawer: {
        styleOverrides: {
            paper: {
                borderRight: 'none',
            }
        }
    }
  },
});

export default theme;
