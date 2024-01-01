import React, { useEffect, useState } from 'react';
import { GetAllPostsHandler } from '../../APIHandlers/posts/GetAllPostHandler';
import { Post } from '../../types/types';
import  PostCard from './card'
import { Box, Button, FormControlLabel, Stack, Switch, Typography } from '@mui/material';
import InfiniteScroll from 'react-infinite-scroll-component';
import { useParams } from 'react-router';
//Not used. Implemented sorting in cards
export function SortingSwitch(){
    const [checked, setChecked] = React.useState(false);
    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setChecked(event.target.checked);
    };
    return (
        <Box>
        <Stack direction="row" spacing={1} alignItems="center">
        <Typography>Time</Typography>
        <Switch
            checked={checked}
            // onChange={}

        />
        <Typography>Upvotes</Typography>
        </Stack>
        </Box>
    );
}
