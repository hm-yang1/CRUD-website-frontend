import React, { useState, ChangeEvent, useEffect } from 'react';
import { Box, Button, Dialog, DialogActions, DialogContent, DialogTitle, TextField } from '@mui/material';
import { CommentRequest } from '../../types/types';
import { UseAuth } from '../../pages/Authentication/AuthContext';
import  CreateCommentHandler  from '../../APIHandlers/comments/CreateCommentHandler'
import { useNavigate } from 'react-router-dom';
import GetCommentHanlder from '../../APIHandlers/comments/GetCommentHandler';
import EditCommentHandler from '../../APIHandlers/comments/EditCommentHandler';

interface EditCommentProps{
    isVisible: boolean,
    handleClose: () => void
    commentID: number,
}

export function EditComment({ isVisible, commentID, handleClose}: EditCommentProps) {
    const navigate = useNavigate();
    const { AuthUsername } = UseAuth();
    const [editedComment, setEditedComment] = useState<CommentRequest>({
        postid: -1,
        username: AuthUsername,
        description: '',
    })
    useEffect(() => {
        const fetchComment = async () => {
            try {
                const originalComment = await GetCommentHanlder(commentID);
                if (originalComment?.username === AuthUsername) {
                    setEditedComment({
                        username: AuthUsername,
                        postid: originalComment.postid,
                        description: originalComment.description
                    })
                }
            } catch (error) {
                console.error('Error fetching comment:', error);
            }
        }
        fetchComment();
    }, [commentID]);

    async function handleSubmit() {
        try {
            const Comment = await EditCommentHandler(editedComment, commentID);
            console.log('Edited Comment:', Comment);
            window.location.reload();
        } catch (error) {
            console.error('Error editing comment:', error);
        }
    }

    return (
        <>
            <Dialog 
                fullWidth 
                open ={isVisible} 
                onClose={handleClose}
                maxWidth='md'
            >
                <DialogTitle>Edit Comment</DialogTitle>
                <DialogContent>
                    <TextField
                        margin='normal'
                        fullWidth
                        autoFocus
                        multiline
                        id="comment"
                        label="Comment..."
                        value={editedComment.description}
                        onChange={(e) => setEditedComment({...editedComment, description: e.target.value})}
                    />
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleClose}>Cancel</Button>
                    <Button onClick={()=>handleSubmit()}>Submit</Button>
                </DialogActions>
            </Dialog>
        </>
    );
}