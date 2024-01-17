import { Button, Dialog, DialogActions, DialogContent, DialogTitle, Typography } from '@mui/material';
import * as React from 'react';

interface ProfileDialogProps {
    username: string,
    isVisible: boolean,
    handleClose: () => void
}

export function ProfileDialog({ username, isVisible, handleClose }: ProfileDialogProps){
//Temporary solution, would want a profile page with more functionality
    return (
        <Dialog
            fullWidth 
            open ={isVisible} 
            onClose={handleClose}
            maxWidth='md'
        >
            <DialogTitle>Profile</DialogTitle>
            <DialogContent>
                <Typography variant='body1'>
                    Username: ${username}
                </Typography>
            </DialogContent>
            <DialogActions>
                <Button onClick={handleClose}>Close</Button>
            </DialogActions>

        </Dialog>
    );
}