import React, { useEffect, useState } from 'react';
import { GetAllPostsHandler } from '../../APIHandlers/posts/GetAllPostHandler';
import { Post } from '../../types/types';
import  PostCard from './card'
import { Box, Button, Typography } from '@mui/material';
import InfiniteScroll from 'react-infinite-scroll-component';
import { useParams } from 'react-router';

interface PostCardsProps {
    getPostsHandler: (string: string) => Promise<Post[]>;
}
export default function PostCards({ getPostsHandler }: PostCardsProps){
    const [posts, setPosts] = useState<Post[]>([]);
    const [isUpvoteButtonDisabled, setIsUpvoteButtonDisabled] = useState(false);
    const [isTimeButtonDisabled, setIsTimeButtonDisabled] = useState(true);
    // const { page: currentPageParam } = useParams<{ page: string }>()
    // const [currentPage, setCurrentPage] = 

    useEffect(function fetchPosts() {
        async function fetchData(){
            try {
                const postsData = await getPostsHandler('');
                setPosts(postsData);
            } catch (error) {
                console.error('Error fetching posts:', error);
            } finally {

            }
        }
        fetchData();
    }, []);
    const fetchSortedData = async (sortingParameter:string) => {
        try {
            setIsUpvoteButtonDisabled(true);
            setIsTimeButtonDisabled(true);
            const sortedData = await getPostsHandler(sortingParameter);
            setPosts(sortedData);
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

    if (!posts || posts.length === 0) {
        return (
            <Box 
                alignItems='center'
                display={'flex'}
                justifyContent={'center'}
            >
            <Typography variant='h4'>
                No posts.... Yet :)
            </Typography>
            </Box>
        )
    }

    return (
        <>
            <Box display={'flex'} justifyContent={'flex-end'} mb={2}>
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
            {posts.map((post) => {
                return <PostCard key = {post.postid} post = {post}/>;
            })}
        </>
    )
}