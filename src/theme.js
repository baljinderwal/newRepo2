import { createTheme } from '@mui/material/styles';

const theme = createTheme({
  palette: {
    primary: {
      main: '#5A67D8', // A strong, professional blue
    },
    secondary: {
      main: '#38B2AC', // A vibrant teal accent
    },
    background: {
      default: '#F7FAFC', // Very light grey
      paper: '#FFFFFF',
    },
    text: {
      primary: '#2D3748', // Dark charcoal
      secondary: '#718096', // Medium grey
    },
    divider: '#E2E8F0', // Soft grey for borders
  },
  typography: {
    fontFamily: '"Poppins", "Helvetica", "Arial", sans-serif',
    h1: { fontWeight: 700, fontSize: '3rem' },
    h2: { fontWeight: 700, fontSize: '2.5rem' },
    h3: { fontWeight: 600, fontSize: '2rem' },
    h4: { fontWeight: 600, fontSize: '1.75rem' },
    h5: { fontWeight: 500, fontSize: '1.25rem' },
    h6: { fontWeight: 500, fontSize: '1.1rem' },
    button: {
        textTransform: 'none',
        fontWeight: 600,
    }
  },
  shape: {
    borderRadius: 8,
  },
  components: {
    MuiPaper: {
      defaultProps: {
        elevation: 0,
        variant: 'outlined',
      },
      styleOverrides: {
        root: {
          borderColor: '#E2E8F0',
        },
      },
    },
    MuiButton: {
      styleOverrides: {
        root: {
          borderRadius: 6,
        },
        containedPrimary: {
            '&:hover': {
                backgroundColor: '#4C58B8',
            }
        }
      },
    },
    MuiAppBar: {
      styleOverrides: {
        root: {
          backgroundColor: '#FFFFFF',
          color: '#2D3748',
          boxShadow: '0 1px 3px 0 rgba(0, 0, 0, 0.05)',
          borderBottom: '1px solid #E2E8F0',
        },
      },
    },
    MuiDrawer: {
        styleOverrides: {
            paper: {
                borderRight: 'none',
                backgroundColor: '#FFFFFF',
            }
        }
    },
    MuiTableCell: {
        styleOverrides: {
            head: {
                backgroundColor: '#F7FAFC',
                color: '#718096',
                fontWeight: 600,
                textTransform: 'uppercase',
                fontSize: '0.75rem',
            }
        }
    },
    MuiTableHead: {
        styleOverrides: {
            root: {
                '& .MuiTableCell-root': {
                    borderBottom: 'none',
                }
            }
        }
    }
  },
});

export default theme;
