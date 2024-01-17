import * as React from 'react';
import Card from '@mui/material/Card';
import CardHeader from '@mui/material/CardHeader';
import CardContent from '@mui/material/CardContent';
import IconButton, { IconButtonProps } from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import { useState } from 'react';
import { Comment } from '../../types/types';
import { useNavigate } from 'react-router-dom';
import { UseAuth } from '../../pages/Authentication/AuthContext';
import MenuItem from '@mui/material/MenuItem';
import Menu from '@mui/material/Menu';
import { Grid } from '@mui/material';
import { EditComment } from './EditComment';
import { DeleteCommentConfirmation } from './DeleteComment';
import UpvoteButton from '../upvotes/UpvoteButton';

interface CommentCardProps {
    comment: Comment;
}

export default function CommentCard({ comment } :CommentCardProps) {
    const naviage = useNavigate();
    const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
    const { AuthUsername: authenticatedUsername } = UseAuth();
    const isCommentOwner = authenticatedUsername === comment.username;
    const datetime = new Date(comment.datetime).toLocaleString();
    const [isDeleteConfirmationVisible, setIsDeleteConfirmationVisible] = useState(false);
    const [isEditOpen, setIsEditOpen] = useState(false);
    
    const handleMenuOpen = (event: React.MouseEvent<HTMLElement>) => {
        setAnchorEl(event.currentTarget);
    };
    const handleMenuClose = () => {
        setAnchorEl(null);
    };

    const handleEdit = () => {
        setIsEditOpen(!isEditOpen);
    };

    //Delete Dialog needs more stuff
    const handleDelete = () => {
        setIsDeleteConfirmationVisible(true);
    };
    const handleDeleteCancel = () => {
        setIsDeleteConfirmationVisible(false);
    }
    
    const handleClick = () => {
        alert("HAHAHA")
        return;
    };

    const handleUpvote = () => {
        alert("HAHAHA")
        return;
    };
    const handleComment = () => {
        alert("HAHAHA")
        return;
    };

    return (
        <Card sx={{ 
            width:'90%',
            marginBottom: 1,
        }}>
        <CardHeader
            sx={{backgroundColor: '#f0f0f0' }}
            subheader={`By: ${comment.username} | ${datetime}`}
            action = {
                isCommentOwner && (
                    <IconButton aria-label='more' onClick={handleMenuOpen}>
                        <MoreVertIcon/>
                    </IconButton>
                )
            }
        />
        <Menu
            anchorEl={anchorEl}
            open={Boolean(anchorEl)}
            onClose={handleMenuClose}
        >
            <MenuItem onClick={handleEdit}>Edit</MenuItem>
            <MenuItem onClick={handleDelete}>Delete</MenuItem>
        </Menu>
            <CardContent>
                <EditComment 
                    isVisible={isEditOpen} 
                    commentID={comment.commentid} 
                    handleClose={handleEdit} 
                />
                <DeleteCommentConfirmation
                    isVisible={isDeleteConfirmationVisible}
                    commentID={comment.commentid}
                    description={comment.description}
                    handleClose={handleDeleteCancel}
                />
                <Typography variant="body1" color="text.secondary">
                    {comment.description}
                </Typography>
            </CardContent>
        <CardContent>
            <Grid container justifyContent="space-between" alignItems="center">
                <Grid item>
                <UpvoteButton isPost = {false} id={comment.commentid}/>
                <Typography variant='body2' color="text.secondary">
                        Upvotes: {comment.upvote}
                </Typography>
                </Grid>
                <Grid item>
                </Grid>
            </Grid> 

        </CardContent>
        </Card>
    );
}    
