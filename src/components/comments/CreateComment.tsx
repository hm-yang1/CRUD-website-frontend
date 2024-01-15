import React, { useState, ChangeEvent } from 'react';
import { Box, Button, TextField } from '@mui/material';
import { CommentRequest } from '../../types/types';
import { UseAuth } from '../../pages/Authentication/AuthContext';
import  CreateCommentHandler  from '../../APIHandlers/comments/CreateCommentHandler'
import { useNavigate } from 'react-router-dom';

interface CreateCommentProps {
    IsVisible: boolean
    postID: number
}

export function CreateComment( { postID, IsVisible }: CreateCommentProps) {
    const navigate = useNavigate();
    const {isAuthenticated, AuthUsername} = UseAuth();
    const [newComment, setNewComment] = useState<CommentRequest>({
        postid: postID,
        username: AuthUsername,
        description: '',
    });

    async function handleCreateComment(){
        try{
            const createdComment = await CreateCommentHandler(newComment);
            console.log('Created Comment:', createdComment)
        } catch (error) {
            console.error('Error creating post:', error);
        }
    }

    const AuthCheckandCreateComment = async () => {
        if(isAuthenticated) {
            await handleCreateComment();
            window.location.reload();
        } else {
            navigate('/login');
        }
    }

    const handleCancel = () => {
        IsVisible = false;
    }
    return (
        <div>
        {IsVisible && <Box style={{ marginTop: '10px' }}>
            <TextField
            autoFocus
            label="Comment..."
            variant="outlined"
            fullWidth
            value={newComment.description}
            onChange={(e) => setNewComment({...newComment, description:e.target.value})}
            multiline
            rows={3}
            style={{ marginBottom: '5px' }}
            />
            <Box display="flex" justifyContent="flex-end">
                <Button onClick={handleCancel} variant="text">
                    Cancel
                </Button>
                <Button onClick={AuthCheckandCreateComment} variant="contained" color="secondary">
                    Submit
                </Button>
            </Box>
        </Box>
        }
        </div>
    );
}
