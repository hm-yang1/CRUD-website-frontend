import React from 'react';
import { createTheme, ThemeProvider, CssBaseline } from '@mui/material';


import { ThemeOptions } from '@mui/material/styles';

export const DefaultTheme = createTheme({
    palette: {
        mode: 'light',
        primary: {
        main: '#9057fa',
        },
        secondary: {
        main: '#8a70ba',
        },
        info: {
        main: '#6e687a',
        },
        success: {
        main: '#a5a271',
        },
    },
    typography: {
        fontFamily: 'Arial, sans-serif', // Your custom default font
    },
});
