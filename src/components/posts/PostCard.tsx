import * as React from 'react';
import Card from '@mui/material/Card';
import CardHeader from '@mui/material/CardHeader';
import CardContent from '@mui/material/CardContent';
import IconButton, { IconButtonProps } from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import { red } from '@mui/material/colors';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import ButtonBase from '@mui/material/ButtonBase';
import { ReactNode, useEffect, useState } from 'react';
import { Post } from '../../types/types';
import Button from '@mui/material/Button';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import ThumbUpIcon from '@mui/icons-material/ThumbUp';
import { UseAuth } from '../../pages/Authentication/AuthContext';
import MenuItem from '@mui/material/MenuItem';
import Menu from '@mui/material/Menu';
import AddCommentRoundedIcon from '@mui/icons-material/AddCommentRounded';
import { Box, Grid } from '@mui/material';
import { DeletePostConfirmation } from './DeletePost';
import { CreateComment } from '../comments/CreateComment';
import UpvoteButton from '../upvotes/UpvoteButton';
import GetPostUpvoteHandler from '../../APIHandlers/upvotes/GetPostUpvoteHandler';

function ClickableBox({ onClick, children }: { onClick: () => void; children: ReactNode }): React.ReactElement {
    //Not used
    return (
      <ButtonBase
        focusRipple
        onClick={onClick}
        style={{ width: '100%', height: '100%', borderRadius: '8px', overflow: 'hidden' }}
      >
        {children}
      </ButtonBase>
    );
}

interface PostCardProps {
    post: Post;
}


export default function PostCard({ post } :PostCardProps) {
    //Renders 1 post
    const naviage = useNavigate();
    const location = useLocation();
    const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
    const { AuthUsername } = UseAuth();
    const isPostOwner = AuthUsername === post.username;
    const datetime = new Date(post.datetime).toLocaleString();
    const [isDeleteConfirmationVisible, setIsDeleteConfirmationVisible] = useState(false);
    const [isCommentBoxVisible, setCommentBoxVisibility] = useState(false);
    const [isUpvoted, setIsUpvoted] = useState(false);
    const isViewPage = location.pathname.startsWith('/posts/');

    const handleMenuOpen = (event: React.MouseEvent<HTMLElement>) => {
        setAnchorEl(event.currentTarget);
    };
    const handleMenuClose = () => {
        setAnchorEl(null);
    };

    const handleEdit = () => {
        naviage(`/posts/edit/${post.postid}`)
        handleMenuClose();
        return;
    };
    //Delete Dialog needs more stuff
    const handleDelete = () => {
        setIsDeleteConfirmationVisible(true);
        return;
    };

    const handleDeleteCancel = () => {
        setIsDeleteConfirmationVisible(false);
    }
    const handleComment = () => {
        setCommentBoxVisibility(!isCommentBoxVisible);
    };
    const handleTagClick = (tag: string) => {
        naviage(`/filtered-posts?tags=${tag}`)
    }    
    return (
        <Box
            marginBlock={1}
            borderRadius={5}
        >
        <Card sx={{ 
            maxWidth:'100%',
            marginLeft: 1.5,
        }}>
        <CardHeader
            sx={{backgroundColor: '#f0f0f0' }}
            title={
                <Button component={Link} to={`/posts/${post.postid}`} color="inherit" style={{ textDecoration: 'none' }}>
                  {post.title}
                </Button>
              }
            subheader={`By: ${post.username} | ${datetime}`}
            action = {
                isPostOwner && (
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
            <DeletePostConfirmation
                postID={post.postid}
                postTitle={post.title}
                isOpen = {isDeleteConfirmationVisible}
                onCancel={handleDeleteCancel}
            />
            <>
                {post.tags.map((tag, index) => (
                    <Button 
                        onClick={() => handleTagClick(tag)}
                        key={index} 
                        variant="outlined" 
                        style={{ fontSize: '0.7rem', marginRight: 8 }}>
                    {tag}
                    </Button>
                ))}
            </>
        </CardContent>
            <CardContent>
                <Typography margin='medium' align="left" variant="body1" color="text.secondary">
                    {isViewPage ? post.description : post.description.length > 200 ? `${post.description.substring(0, 200)}...` : post.description}                
                </Typography>
            </CardContent>
        <CardContent>
            <Grid container justifyContent="space-between" alignItems="center">
                <Grid item>
                <UpvoteButton 
                    id={post.postid}
                    isPost={true}
                />
                <Typography variant='body2' color="text.secondary">
                        Upvotes: {post.upvote}
                </Typography>
                </Grid>
                <Grid item>
                <IconButton aria-label="Comment" onClick={handleComment}>
                    <AddCommentRoundedIcon/>
                    <Typography variant='body2' color="text.secondary" style={{marginLeft: '3px'}}>
                        Comment
                    </Typography>
                </IconButton>
                </Grid>
            </Grid> 

        </CardContent>
        </Card>
        <CreateComment IsVisible ={isCommentBoxVisible} postID={post.postid}/>
        </Box>
    );
}