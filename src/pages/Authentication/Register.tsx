import * as React from 'react';
import { RegisterRequest }from '../../types/types';
import { API_BASE_URL } from '../../config/config';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import Input from '@mui/material/Input';
import Link from '@mui/material/Link';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { useState } from 'react';
import { useForm } from 'react-hook-form'
import { useNavigate } from "react-router-dom";
import { IconButton, InputAdornment, TextField } from '@mui/material';
import { Visibility, VisibilityOff } from '@mui/icons-material';
import { UseAuth } from './AuthContext';

const defaultTheme = createTheme();

export default function Register() {
    const navigate = useNavigate();
    const { isAuthenticated, handleLogin } = UseAuth();
    const [error, setError] = useState<string | null>(null);
    const [showPassword, setShowPassword] = useState(false);
    const {
        register,
        handleSubmit,
        formState: { errors, isSubmitting },
        reset,
        getValues,
    } = useForm<RegisterRequest>();

    if (isAuthenticated) {
        navigate('/');
    }
    
    async function onSubmit(registerRequest: RegisterRequest) {
        const jsonData = JSON.stringify(registerRequest);
        console.log(jsonData)
        try {
            const response = await fetch(`${API_BASE_URL}/api/register`,{
                method: 'POST',
                headers: {
                    'Content-Type': 'application.json',
                },
                body: jsonData,
            });

            if (response.ok) {
                console.log('Registered Successfully');
                navigate("/login")
            } else if (response.status === 401) {
                setError('Registration unauthorised')
                console.error(error)
            } else if (response.status === 409){
                setError("Username taken")
                console.error(error)
            } else {
                setError("Error registering, try again later :(")
                console.error(error)
            }
        } catch (error) {
            console.error('Error:', error);
        }
    }
    return (
        <ThemeProvider theme={defaultTheme}>
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
                Sign up
            </Typography>
            <Box component="form" noValidate onSubmit={handleSubmit(onSubmit)} sx={{ mt: 3 }}>
                <Grid container spacing={2}>
                <Grid item xs={12}>
                    <TextField
                    {...register('username', {
                        required: "Username is required"
                    })}
                    required
                    fullWidth
                    id="username"
                    name="username"
                    label="Username"
                    autoComplete="username"
                    autoFocus
                    />
                    {error && <p className='text-red-500'>{error}</p>}
                    {errors.username && (
                        <p className='text-red-500'>{`${errors.username.message}`}</p>
                    )}
                </Grid>
                <Grid item xs={12}>
                    <TextField
                    {...register('password', {
                        required: "Password is required",
                        minLength: {
                            value: 8,
                            message: `Password must be of at least 8 characters`
                        }
                    })}
                    required
                    fullWidth
                    name="password"
                    type={showPassword ? 'text' : 'password'}
                    id="password"
                    label="Password"
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
                </Grid>
                </Grid>
                <Button
                disabled = {isSubmitting}
                type="submit"
                fullWidth
                variant="contained"
                sx={{ mt: 3, mb: 2 }}
                >
                Register
                </Button>
                <Grid container justifyContent="flex-end">
                <Grid item xs>
                    <Link href="/" variant="body2">
                    Go Home
                    </Link>
                </Grid>
                <Grid item>
                    <Link href="/login" variant="body2">
                    Already have an account? Sign in
                    </Link>
                </Grid>
                </Grid>
            </Box>
            </Box>
        </Container>
        </ThemeProvider>
    );
}