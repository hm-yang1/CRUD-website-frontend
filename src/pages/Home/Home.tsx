import * as React from 'react';
import Box from '@mui/material/Box';
import Topbar  from '../../components/topbar/topbar'
import Sidebar from '../../components/sidebar/sidebar';
import { Stack, Switch } from '@mui/material';
import PostCards from '../../components/posts/PostCards';
import { GetAllPostsHandler } from '../../APIHandlers/posts/GetAllPostHandler';
import { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router';

export default function Home() {
    //Default page that loads postcards, topbar and sidebar
    return (
        <Box>
            <Topbar/>
            <Stack 
                marginTop={'60px'}
                direction="row" 
                spacing={2} 
                justifyContent="space-between"
            >
                <Box
                    flex={4} 
                    p={{ xs: 0, md: 2 }} 
                    bgcolor="white"
                    position={'relative'}
                >
                    <PostCards getPostsHandler={(sortBy:string, currentPage: number) => GetAllPostsHandler(sortBy, currentPage)}/>
                </Box>
                <Box
                    position={{ xs: 'static', md: 'sticky' }} 
                    top={{ xs: 'auto', md: 0 }}
                    flex={1}
                    minHeight={'100vh'}
                >
                    <Sidebar/>
                </Box>
            </Stack>
        </Box>
    )
}