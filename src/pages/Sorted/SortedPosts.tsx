import * as React from 'react';
import Box from '@mui/material/Box';
import Topbar  from '../../components/topbar/topbar'
import Sidebar from '../../components/sidebar/sidebar';
import { Stack } from '@mui/material';
import PostCards from '../../components/posts/cards';
import { useLocation } from 'react-router';
import { GetFilteredPostsHandler } from '../../APIHandlers/posts/GetFilteredPostsHandler';