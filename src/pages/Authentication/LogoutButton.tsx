import * as React from 'react';
import { useNavigate } from 'react-router-dom';
import { API_BASE_URL } from '../../config/config';
import LogoutIcon from '@mui/icons-material/Logout';
import { useState } from 'react';
import { IconButton, Typography } from '@mui/material';
import { UseAuth } from './AuthContext';
import LogoutHandler from '../../APIHandlers/authentication/LogoutHandler';

export default function LogoutButton(){
    const [error, setError] = useState<string | null>(null);
    const navigate = useNavigate();
    const { handleLogout } = UseAuth();
    // async function onSubmit() {
    //     try {
    //         const response = await fetch(`${API_BASE_URL}/api/logout`,{
    //             method: 'POST',
    //             credentials: 'include'
    //         });
    //         if(response.ok) {
    //             console.log('Logout Successful');
    //             handleLogout();
    //             window.location.reload();
    //             navigate("/");
    //         }
    //         if (response.status === 500) {
    //             setError('Failed to get session');
    //             console.error(error);
    //             alert("error 500")
    //         } else if (response.status === 401) {
    //             setError('Unauthorised');
    //             console.log(error);
    //             alert(error)
    //         } else if (response.status != 200) {
    //             console.error('Failed to send login request');
    //             alert(error)
    //         }
    //     } catch (error) {
    //         console.error('Error:', error);
    //     }
    // }

    async function onSubmit() {
        try{
            const response = await LogoutHandler();
            if (response === 'Logout Successful') {
                window.location.reload();
                navigate("/");
            } else {
                alert(response);
            }
        } catch {
            alert('Failed to send logout request')
        }
    }
    return (
        <IconButton 
            size='large'
            onClick={onSubmit}
        >
            <LogoutIcon/>
            <Typography variant='body1' fontStyle='arial'>
                Logout
            </Typography>
        </IconButton>
    )
}