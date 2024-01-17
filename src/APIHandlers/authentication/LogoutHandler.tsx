import * as React from 'react';
import { API_BASE_URL } from '../../config/config';

export default async function LogoutHandler() {
    try {
        const response = await fetch(`${API_BASE_URL}/api/logout`,{
            method: 'POST',
            credentials: 'include'
        });
        if(response.ok) {
            const success = 'Logout Successful';
            console.log(success);
            return success;
        }
        let error = '';
        if (response.status === 500) {
            error = 'Failed to get session';
            return error;
        } else if (response.status === 401) {
            error = 'Unauthorised';
            return error;
        } else if (response.status != 200) {
            error = 'Error sending logout request';
            console.log('Error status:', response.status);
            return error;
        }
    } catch {
        const error = 'Failed to send logout request';
        return error;
    }
}