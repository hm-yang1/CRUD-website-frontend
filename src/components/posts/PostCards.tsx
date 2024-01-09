import React, { useEffect, useRef, useState } from 'react';
import { Post } from '../../types/types';
import  PostCard from './PostCard'
import { Box, Button, Typography } from '@mui/material';
import InfiniteScroll from 'react-infinite-scroll-component';

//Renders renders 10 posts at a time with infinite scroll
interface PostCardsProps {
    getPostsHandler: (sortBy: string, currentPage: number) => Promise<Post[]>;
}
export default function PostCards({ getPostsHandler }: PostCardsProps){
    const [posts, setPosts] = useState<Post[]>([]);
    const [isUpvoteButtonDisabled, setIsUpvoteButtonDisabled] = useState(false);
    const [isTimeButtonDisabled, setIsTimeButtonDisabled] = useState(true);
    const [page, setPage] = useState(1);
    const [hasMore, setHasMore] = useState(true);

    async function fetchData(pageNumber: number){
        try {
            console.log("Current page:", pageNumber)
            const newData = await getPostsHandler('', pageNumber);

            if (!newData || newData.length === 0) {
                setHasMore(false);
            } else {
                console.log(newData);
                const uniqueNewPosts = newData.filter(
                    (newPost) => !posts.some((post) => post.postid === newPost.postid)
                );
                setPosts((prevPosts) => [...prevPosts, ...uniqueNewPosts]);
                setPage(pageNumber + 1);
                if (uniqueNewPosts.length < 5) {
                    setHasMore(false);
                }
            }
        } catch (error) {
            console.error('Error fetching posts:', error);
        }
    }

    useEffect(() => {
        const fetchInitialData =async () => {
            await fetchData(page);
        }
        fetchInitialData();
    }, []);

    const fetchSortedData = async (sortingParameter:string) => {
        try {
            setIsUpvoteButtonDisabled(true);
            setIsTimeButtonDisabled(true);
            const sortedData = await getPostsHandler(sortingParameter, 1);
            if (!sortedData || sortedData.length === 0) {
                setHasMore(false);
            } else {
                console.log(sortedData);
                const uniqueNewPosts = sortedData.filter(
                    (newPost) => !posts.some((post) => post.postid === newPost.postid)
                );
                setPosts((prevPosts) => [...prevPosts, ...uniqueNewPosts]);
                setPage(page + 1);
            }
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
        <div>
            <Box 
                display={'flex'} 
                justifyContent={'flex-end'} 
                paddingTop={2}
            >
                <Button
                    size='small'
                    variant='contained'
                    onClick={handleUpvoteSort}
                    disabled={isUpvoteButtonDisabled}
                >
                    <Typography
                        variant='subtitle2'
                        color={'text.secondary'}
                        style={{textTransform: 'none'}}
                    >
                        Sort by Upvotes
                    </Typography>
                </Button>
                <Button
                    size='small'
                    variant='contained'
                    onClick={handleTimeSort}
                    disabled={isTimeButtonDisabled}
                >
                    <Typography
                        variant='subtitle2'
                        color={'text.secondary'}
                        style={{textTransform: 'none'}}
                    >
                        Sort by Time
                    </Typography>
                </Button>
            </Box>
            <InfiniteScroll
                dataLength={posts.length}
                next={() => fetchData(page)}
                hasMore={hasMore}
                loader={<h4>Loading...</h4>}
                endMessage={
                    <p style={{ textAlign: 'center' }}>
                      <b>Yay! You have seen it all</b>
                    </p>
                }
            >
            <Box>
            {posts.map((post) => {
                return <PostCard key = {post.postid} post = {post}/>;
            })}
            </Box>
            </InfiniteScroll>
        </div>
    )
}