import React, { useEffect, useState } from 'react';
import { UseAuth } from '../../pages/Authentication/AuthContext';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import ThumbUpIcon from '@mui/icons-material/ThumbUp';
import Box from '@mui/material/Box';
import { Icon, IconButton } from '@mui/material';
import GetPostUpvoteHandler from '../../APIHandlers/upvotes/GetPostUpvoteHandler';
import GetCommentUpvoteHandler from '../../APIHandlers/upvotes/GetCommentUpvote';
import AddUpvoteHandler from '../../APIHandlers/upvotes/AddUpvoteHandler';
import { UpvoteRequest } from '../../types/types';
import DeleteUpvoteHandler from '../../APIHandlers/upvotes/DeleteUpvoteHandler';
import { useNavigate } from 'react-router';

interface UpvoteButtonProps {
    isPost: boolean
    id: number;
}
  
const UpvoteButton: React.FC<UpvoteButtonProps> = ({ isPost, id }) => {
    const [isUpvoted, setIsUpvoted] = useState(false);
    const { isAuthenticated, AuthUsername} = UseAuth();
    const request: UpvoteRequest = {
        postid: id,
        commentid: id,
        username: AuthUsername,
    }
    if (isPost) {
        request.commentid = 0;
    } else {
        request.postid = 0;
    }
    useEffect(() => {
        async function checkUpvoteStatus() {
            try {
                const handler = isPost ? GetPostUpvoteHandler : GetCommentUpvoteHandler
                const upvoted = await handler(request);
                setIsUpvoted(upvoted);
            } catch (error) {
                console.error('Error checking upvote status:', error);
            }
        }
        checkUpvoteStatus();
    }, [id]);

    async function handleUpvoteClick() {
        try {
            await AddUpvoteHandler(request);
            setIsUpvoted(true);
        } catch (error) {
            console.error('Error adding upvote:', error);
        }
    }

    async function handleDeleteUpvoteClick() {
        try {
            await DeleteUpvoteHandler(request);
            setIsUpvoted(false);
        } catch (error) {
            console.error('Error adding upvote:', error);
        }
    }

    function handleClick() {
        if (isUpvoted) {
            handleDeleteUpvoteClick();
        } else {
            handleUpvoteClick();
        }
    }
    return (
        <IconButton
            style={{ color: isUpvoted ? 'red' : 'grey' }}
            onClick={handleClick}
        >
            <ThumbUpIcon/>
        </IconButton>
    );
};

export default UpvoteButton;