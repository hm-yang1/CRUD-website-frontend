import * as React from 'react';
import Box from '@mui/material/Box';
import Topbar  from '../../../components/topbar/topbar'
import Sidebar from '../../../components/sidebar/sidebar';
import { Stack } from '@mui/material';
import PostCards from '../../../components/posts/PostCards';
import { useLocation } from 'react-router';
import { GetFilteredPostsHandler } from '../../../APIHandlers/posts/GetFilteredPostsHandler';
import { GetSearchedPostsHandler } from '../../../APIHandlers/posts/GetSearchedPostsHandler';

export default function SearchedPosts() {
    const location = useLocation();
    const queryParams = new URLSearchParams(location.search)
    const query = queryParams.get('query');
    console.log(query)
    return (
        <Box>
            <Topbar />
            <Stack direction="row" spacing={2} justifyContent="space-between">
                <Box flex={4} p={{ xs: 0, md: 2 }} bgcolor="white">
                    <PostCards getPostsHandler={(sortBy: string, currentPage: number) => GetSearchedPostsHandler(query, sortBy, currentPage)}/>
                </Box>
                <Sidebar/>
            </Stack>
        </Box>
    )
}