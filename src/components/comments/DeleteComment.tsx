import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle } from '@mui/material';
import DeleteCommentHandler from '../../APIHandlers/comments/DeleteCommentHandler';



interface DeleteCommentConfirmationProps {
    commentID: number;
    description: string
    isVisible: boolean;
    handleClose: () => void;
}

export function DeleteCommentConfirmation({commentID, description, isVisible, handleClose}: DeleteCommentConfirmationProps) {
  const navigate = useNavigate();
  const handleDeleteConfirm = async (commentID: number) => {
    try {
        await DeleteCommentHandler(commentID);
        console.log('Delete Success')
        window.location.reload();
    } catch(error) {
        console.error('Error deleting comment:',error);
    }
}
  return (
    <Dialog open={isVisible} onClose={handleClose}>
      <DialogTitle>Delete Comment</DialogTitle>
      <DialogContent>
        <DialogContentText>
          Are you sure you want to delete this comment?
        </DialogContentText>
        <DialogContentText align='center'>
          Comment: {description}
        </DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button onClick={handleClose} color="primary">
          Cancel
        </Button>
        <Button onClick={() => handleDeleteConfirm(commentID)} color="primary">
          Yes, Delete
        </Button>
      </DialogActions>
    </Dialog>
  );
}