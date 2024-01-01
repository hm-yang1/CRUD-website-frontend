import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { Post } from '../../types/types';
import GetPostById from '../../APIHandlers/posts/GetPostByIdHandler';
import PostCard from '../../components/posts/card';
import Box from '@mui/material/Box';
import Topbar from '../../components/topbar/topbar';
import { Stack } from '@mui/material';
import PostCards from '../../components/posts/cards';
import Sidebar from '../../components/sidebar/sidebar';
import { GetCommentsHandler } from '../../APIHandlers/comments/GetCommentsHandler';
import CommentCards from '../../components/comments/CommentCards';

export default function ViewPost(){
    const { postid } = useParams<{postid: string}>();
    //Use params might return undefined, provide definite value of '' to parseInt
    const postIdNumber = parseInt(postid ?? '', 10);
    const [post, setPost] = useState<Post | null>(null);

    useEffect(() => {
        if (!isNaN(postIdNumber)){
            const fetchPost = async () => {
                const fetchedPost = await GetPostById(postIdNumber);
                setPost(fetchedPost);
            };
            fetchPost();
        }
    }, [postIdNumber]);

    if(!post) {
        return <div>Loading.....</div>
    }

    return (
        <Box>
            <Topbar />
            <Box>
            <Stack direction="row" spacing={2} justifyContent="space-between">
                <Box flex={4} p={{ xs: 0, md: 2 }} bgcolor="white">
                    <PostCard post={post}/>
                </Box>
            </Stack>
            <CommentCards postId={postIdNumber} getCommentsHandler={() => GetCommentsHandler(postIdNumber, '')}/>
            </Box>
        </Box>
    )
}