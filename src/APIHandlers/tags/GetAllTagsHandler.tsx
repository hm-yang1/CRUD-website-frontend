import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { Tag } from '../../types/types';
import GetPostById from '../../APIHandlers/posts/GetPostByIdHandler';
import PostCard from '../../components/posts/card';
import Box from '@mui/material/Box';
import Topbar from '../../components/topbar/topbar';
import { Stack } from '@mui/material';
import PostCards from '../../components/posts/cards';
import Sidebar from '../../components/sidebar/sidebar';
import { API_BASE_URL } from '../../config/config';

export default async function GetAllTagsHandler(): Promise<Tag[]> {
    try{
        const response = await fetch(`${API_BASE_URL}/api/tags`);
        if (!response.ok) {
            throw new Error('Failed to fetch tags');
        }
        const tags: Tag[] = await response.json();
        return tags;
    } catch (error) {
        console.error('Error fetching tags:', error);
        throw error;
    }
}