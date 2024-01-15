import * as React from 'react';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import Link from '@mui/material/Link';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import {  ThemeProvider } from '@mui/material/styles';
import { useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { LoginRequest } from '../../types/types';
import { API_BASE_URL } from '../../config/config';
import { DefaultTheme } from '../../styles/theme';
import { useState } from 'react';
import { UseAuth } from './AuthContext';
import { Visibility, VisibilityOff } from '@mui/icons-material';
import { InputAdornment, IconButton } from '@mui/material';

export default function Login() {
    const navigate = useNavigate();
    const { isAuthenticated, handleLogin } = UseAuth();
    const [error, setError] = React.useState<string | null>(null);
    const [showPassword, setShowPassword] = useState(false);
    const {
        register,
        handleSubmit,
        formState: { errors, isSubmitting },
        reset,
        getValues,
    } = useForm<LoginRequest>();

    if (isAuthenticated) {
        navigate('/');
    }
    
    async function onSubmit(loginRequest: LoginRequest) {
        const jsonData = JSON.stringify(loginRequest);
        console.log(jsonData)
        try {
            const response = await fetch(`${API_BASE_URL}/api/login`,{
                method: 'POST',
                headers: {
                    'Content-Type': 'application.json',
                },
                body: jsonData,
                credentials: 'include'
            });

            if (response.status === 401) {
                setError('Invalid username/password')
                console.error(error)
            } else if (response.status === 409) {
                setError('User Already logged in')
                console.error(error)
            } else if (response.status === 500) {
                setError('Internal server error')
                console.error(error)
            } else if (response.ok) {
                console.log('Login Successful');
                // const {token} = await response.json()
                // console.log(token)
                // handleLogin(loginRequest.username)
                // const headers = new Headers({
                //     'Authorization': `Bearer ${token}`,
                // })
                navigate("/")
            } else {
                console.error('Failed to send login request');
            }
        } catch (error) {
            console.error('Error:', error);
        }
    }
    
    return (
        <ThemeProvider theme={DefaultTheme}>
        <Container component="main" maxWidth="xs">
            <CssBaseline />
            <Box
            sx={{
                marginTop: 8,
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
            }}
            >
            <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
                <LockOutlinedIcon />
            </Avatar>
            <Typography component="h1" variant="h5">
                Sign in
            </Typography>
            <Box component="form" onSubmit={handleSubmit(onSubmit)} noValidate sx={{ mt: 1 }}>
                <TextField
                {...register('username',{
                    required: "Username is required"
                })}
                margin="normal"
                fullWidth
                id="username"
                label="Username"
                name="username"
                autoComplete="username"
                autoFocus
                />
                {error && <p className='text-red-500'>{error}</p>}   {/*shows backend errors*/}
                {errors.username && (
                    <p className='text-red-500'>{`${errors.username.message}`}</p>
                )}
                <TextField
                {...register('password', {
                    required: "Password is required"
                })}
                margin="normal"
                required
                fullWidth
                name="password"
                label="Password"
                type={showPassword ? 'text' : 'password'}
                id="password"
                autoComplete="current-password"
                InputProps={{
                    endAdornment: (
                        <InputAdornment position="end">
                            <IconButton
                                onClick={() => setShowPassword(!showPassword)}
                                onMouseDown={(e) => e.preventDefault()}
                                onMouseUp={(e) => e.preventDefault()}//idk why but needed to prevent cursor from jumping to front
                            >
                                {showPassword ? <Visibility /> : <VisibilityOff />}
                            </IconButton>
                        </InputAdornment>
                    ),
                }}
                />
                {errors.password && (
                    <p className='text-red-500'>{`${errors.password.message}`}</p>
                )}
                <Button
                disabled = {isSubmitting}
                type="submit"
                fullWidth
                variant="contained"
                sx={{ mt: 3, mb: 2 }}
                >
                Sign In
                </Button>
                <Grid container>
                <Grid item xs>
                    <Link href="/" variant="body2">
                    Go Home
                    </Link>
                </Grid>
                <Grid item>
                    <Link href="/register" variant="body2">
                    {"Don't have an account? Sign Up"}
                    </Link>
                </Grid>
                </Grid>
            </Box>
            </Box>
        </Container>
        </ThemeProvider>
    );
}