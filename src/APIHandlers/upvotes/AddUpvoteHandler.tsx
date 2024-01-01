import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { Tag, Upvote, UpvoteRequest } from '../../types/types';
import GetPostById from '../posts/GetPostByIdHandler';
import PostCard from '../../components/posts/card';
import Box from '@mui/material/Box';
import Topbar from '../../components/topbar/topbar';
import { Stack } from '@mui/material';
import PostCards from '../../components/posts/cards';
import Sidebar from '../../components/sidebar/sidebar';
import { API_BASE_URL } from '../../config/config';
import { error } from 'console';

export default async function AddUpvoteHandler(upvoteRequest: UpvoteRequest) {
    if (upvoteRequest.username === "") {
        throw new Error('Not logged in');
    }
    try {
        const response = await fetch(`${API_BASE_URL}/api/upvotes/add`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(upvoteRequest),
            credentials: 'include'
        });
        if (!response.ok) {
            throw new Error('Failed to add upvote')
        }

        const upvote: Upvote = await response.json();
        console.log(upvote);
    } catch (error) {
        console.error('Error creating upvote:', error);
        throw error;
    }
}