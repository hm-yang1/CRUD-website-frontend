import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle } from '@mui/material';
import DeletePostHandler from '../../APIHandlers/posts/DeletePostHandler';



interface DeletePostConfirmationProps {
    postID: number
    postTitle: string;
    isOpen: boolean;
    onCancel: () => void;
}

export function DeletePostConfirmation(props: DeletePostConfirmationProps) {
  //Dialog shown when user clicks delete button on PostCard
  const { postID, postTitle, isOpen, onCancel } = props;
  const navigate = useNavigate();
  const handleDeleteConfirm = async (postId: number) => {
    try {
        await DeletePostHandler(postId);
        console.log('Delete Success')
        navigate('/');
        window.location.reload();
    } catch(error) {
        console.error('Error deleting post:',error);
    }
  }

  return (
    <Dialog open={isOpen} onClose={onCancel}>
      <DialogTitle>Delete Post</DialogTitle>
      <DialogContent>
        <DialogContentText>
          Are you sure you want to delete this post?
        </DialogContentText>
        <DialogContentText align='center'>
          Post Title: {postTitle}
        </DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button onClick={onCancel} color="primary">
          Cancel
        </Button>
        <Button onClick={() => handleDeleteConfirm(postID)} color="primary">
          Yes, Delete
        </Button>
      </DialogActions>
    </Dialog>
  );
}