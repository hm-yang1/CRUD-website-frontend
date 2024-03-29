import React, { useState } from 'react';
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
    const [descriptionError, setDescriptionError] = useState('');
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
        if(!isAuthenticated) {
            navigate('/login');
        }
        if(!newComment.description.trim()){
            setDescriptionError('Description cannot be empty!');
            return;
        } else {
            await handleCreateComment();
            window.location.reload();
        } 
    }

    return (
        <div>
        {IsVisible && <Box
            marginLeft={7}
            marginRight={7}
            marginTop={5}
            >
            <TextField
            autoFocus
            label="Comment..."
            variant="outlined"
            fullWidth
            value={newComment.description}
            onChange={(e) => {
                setNewComment({...newComment, description:e.target.value});
                setDescriptionError('');
            }}
            multiline
            rows={3}
            />
            <Box 
                display="flex" 
                justifyContent="flex-end"
                marginTop={1}
            >
                <Button onClick={AuthCheckandCreateComment} variant="contained" color="secondary">
                    Submit
                </Button>
            </Box>
            {descriptionError && <p>{descriptionError}</p>}
        </Box>
        }
        </div>
    );
}
