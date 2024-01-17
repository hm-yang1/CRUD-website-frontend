import * as React from 'react';
import { API_BASE_URL } from '../../config/config';
import { LoginRequest } from '../../types/types';

export default async function LoginHandler(loginRequest: LoginRequest) {
    const jsonData = JSON.stringify(loginRequest);
    try {
        const response = await fetch(`${API_BASE_URL}/api/login`,{
            method: 'POST',
            headers: {
                'Content-Type': 'application.json',
            },
            body: jsonData,
            credentials: 'include'
        });
        let error = ''
        if (response.status === 401) {
            error = 'Invalid username/password';
            return error;
        } else if (response.status === 409) {
            error = 'User Already logged in';
            return error;
        } else if (response.status === 500) {
            error = 'Internal server error';
            return error;
        } else if (response.ok) {
            const success = 'Login Successful'
            console.log(success);
            const {token} = await response.json();
            console.log(token);
            const headers = new Headers({
                'Authorization': `Bearer ${token}`,
            });
            return success;
        } else {
            error = 'Login request failed';
            console.log('Login request failed. Status:', response.status);
            return error;
        }
    } catch {
        let error = 'Login request failed';
        console.log('Login request failed');
        return error;
    }
}