import React from 'react';
import { createTheme, ThemeProvider, CssBaseline } from '@mui/material';


import { ThemeOptions } from '@mui/material/styles';

export const DefaultTheme = createTheme({
    palette: {
        mode: 'light',
        primary: {
        main: '#00E2FA',
        },
        secondary: {
        main: '#00FAC0',
        },
        info: {
        main: '#6e687a',
        },
        success: {
        main: '#a5a271',
        },
    },
    typography: {
        fontFamily: 'Helvetica, Arial, Roboto, sans-serif', // Your custom default font
    },
});
