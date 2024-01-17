import React, { useEffect, useState } from 'react';
import { GetCommentsHandler } from '../../APIHandlers/comments/GetCommentsHandler';
import { Comment } from '../../types/types';
import  CommentCard from './CommentCard'
import Box from '@mui/material/Box';
import { Button, Typography } from '@mui/material';

interface CommentCardsProps {
    postId: number
    getCommentsHandler: (id:number, string:string) => Promise<Comment[]>;
}
export default function CommentCards({postId} :CommentCardsProps){
    const [comments, setComments] = useState<Comment[]>([]);
    const [isUpvoteButtonDisabled, setIsUpvoteButtonDisabled] = useState(false);
    const [isTimeButtonDisabled, setIsTimeButtonDisabled] = useState(true);
    useEffect(function fetchPosts() {
        async function fetchData(){
            try {
                const commentsData = await GetCommentsHandler(postId, '');
                setComments(commentsData);
            } catch (error) {
                console.error('Error fetching posts:', error);
            }
        }
        fetchData();
    }, []);

    const fetchSortedData = async (sortingParameter:string) => {
        try {
            setIsUpvoteButtonDisabled(true);
            setIsTimeButtonDisabled(true);
            const sortedData = await GetCommentsHandler(postId, sortingParameter);
            setComments(sortedData);
        } catch(error) {
            setIsUpvoteButtonDisabled(false);
            setIsTimeButtonDisabled(false);
            console.error("Error fetching data:", error)
        }
    };

    const handleUpvoteSort = () => {
        fetchSortedData('upvotes');
        setIsUpvoteButtonDisabled(true);
        setIsTimeButtonDisabled(false);
    }

    const handleTimeSort = () => {
        fetchSortedData('time');
        setIsTimeButtonDisabled(true);
        setIsUpvoteButtonDisabled(false);
    }

    if (!comments) {
        return (
            <Typography marginTop='5px' variant='h6' align='center'>
                No comments for this post... Yet :)
            </Typography>
        );
    }

    return (
        <>
        <Box 
            marginTop={2}
            maxWidth='95%' 
            display={'flex'} 
            justifyContent={'flex-end'} 
            mb={2}
        >
                <Button
                    size='small'
                    variant='contained'
                    onClick={handleUpvoteSort}
                    disabled={isUpvoteButtonDisabled}
                >
                    Sort by Upvotes
                </Button>
                <Button
                    size='small'
                    variant='contained'
                    onClick={handleTimeSort}
                    disabled={isTimeButtonDisabled}
                >
                    Sort by Time
                </Button>
            </Box>
        <Box display='flex' justifyContent='center' flexDirection='column' alignItems="center">
            {comments.map(function renderCommentCard(comment){
                return <CommentCard key = {comment.commentid} comment = {comment}/>;
            })}
        </Box>
        </>
    )
}