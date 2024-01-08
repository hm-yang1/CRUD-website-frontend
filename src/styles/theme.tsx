import React from 'react';
import { createTheme, ThemeProvider, CssBaseline } from '@mui/material';
import { cyan, deepPurple, lightBlue, orange } from '@mui/material/colors';

export const DefaultTheme = createTheme({
    palette: {
        mode: 'light',
        primary: deepPurple,
        secondary: orange,
    },
    typography: {
        fontFamily: 'Roboto, sans-serif', // Your custom default font
    },
});
