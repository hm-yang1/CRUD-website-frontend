import * as React from 'react';
import Box from '@mui/material/Box';
import Topbar  from '../../../components/topbar/topbar'
import Sidebar from '../../../components/sidebar/sidebar';
import { Stack } from '@mui/material';
import PostCards from '../../../components/posts/PostCards';
import { useLocation } from 'react-router';
import { GetFilteredPostsHandler } from '../../../APIHandlers/posts/GetFilteredPostsHandler';

export default function FilteredPosts() {
    const location = useLocation();
    const queryParams = new URLSearchParams(location.search)
    const tagsString = queryParams.get('tags');
    const tags = tagsString ? tagsString.split('&') : [];

    return (
        <Box>
            <Topbar />
            <Stack marginTop={'60px'} direction="row" spacing={2} justifyContent="space-between">
                <Box flex={4} p={{ xs: 0, md: 2 }} bgcolor="white">
                    <PostCards getPostsHandler={(sortBy: string, currentPage: number) => GetFilteredPostsHandler(tags, sortBy, currentPage)}/>
                </Box>
                <Sidebar/>
            </Stack>
        </Box>
    )
}