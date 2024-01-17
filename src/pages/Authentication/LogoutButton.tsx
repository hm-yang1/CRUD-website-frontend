import * as React from 'react';
import { useNavigate } from 'react-router-dom';
import LogoutIcon from '@mui/icons-material/Logout';
import { IconButton, Typography } from '@mui/material';
import { UseAuth } from './AuthContext';
import LogoutHandler from '../../APIHandlers/authentication/LogoutHandler';

export default function LogoutButton(){
    const navigate = useNavigate();

    //Needed to clear username from local storage
    const { handleLogout } = UseAuth();

    async function onSubmit() {
        try{
            const response = await LogoutHandler();
            if (response === 'Logout Successful') {
                handleLogout();
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