import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { Post } from '../../types/types';
import GetPostById from '../../APIHandlers/posts/GetPostByIdHandler';
import PostCard from '../../components/posts/PostCard';
import Box from '@mui/material/Box';
import Topbar from '../../components/topbar/topbar';
import { CircularProgress, Stack, Typography } from '@mui/material';
import { GetCommentsHandler } from '../../APIHandlers/comments/GetCommentsHandler';
import CommentCards from '../../components/comments/CommentCards';

export default function ViewPost(){
    //Displayed when clicked into the post, displays the post and the comment cards
    const { postid } = useParams<{postid: string}>();
    //Use params might return undefined, provide definite value of '' to parseInt
    const postIdNumber = parseInt(postid ?? '', 10);
    const [post, setPost] = useState<Post | null>(null);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        if (!isNaN(postIdNumber)){
            const fetchPost = async () => {
                const fetchedPost = await GetPostById(postIdNumber);
                setPost(fetchedPost);
                setIsLoading(false);
            };
            fetchPost();
        }
    }, [postIdNumber]);

    if (isLoading) {
        return (
            <Box 
                display="flex"
                justifyContent="center"
                alignItems="center"
                height="100vh"
            >
                <CircularProgress/>
            </Box>
        )
    }
    if(!post) {
        return (
            <>
            <Topbar/>
            <Box/>
            <Typography variant='h6'>
                Post Doesn't exist... :(
            </Typography>
            </>
        )
    }

    return (
        <Box>
            <Topbar />
            <Box>
            <Stack direction="row" spacing={2} justifyContent="space-between">
                <Box flex={4} p={{ xs: 0, md: 2 }} bgcolor="white">
                    <Box paddingBlock={4}></Box>
                    <PostCard post={post}/>
                </Box>
            </Stack>
            <CommentCards postId={postIdNumber} getCommentsHandler={() => GetCommentsHandler(postIdNumber, '')}/>
            </Box>
        </Box>
    )
}