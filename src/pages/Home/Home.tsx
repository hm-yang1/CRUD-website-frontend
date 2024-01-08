import * as React from 'react';
import { styled, alpha } from '@mui/material/styles';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import InputBase from '@mui/material/InputBase';
import Badge from '@mui/material/Badge';
import MenuItem from '@mui/material/MenuItem';
import Menu from '@mui/material/Menu';
import MenuIcon from '@mui/icons-material/Menu';
import SearchIcon from '@mui/icons-material/Search';
import AccountCircle from '@mui/icons-material/AccountCircle';
import MailIcon from '@mui/icons-material/Mail';
import NotificationsIcon from '@mui/icons-material/Notifications';
import MoreIcon from '@mui/icons-material/MoreVert';
import Topbar  from '../../components/topbar/topbar'
import Sidebar from '../../components/sidebar/sidebar';
import { Button, FormControlLabel, Stack, Switch } from '@mui/material';
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