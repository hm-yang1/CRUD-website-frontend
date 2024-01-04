import * as React from 'react';
import { Post } from '../../types/types'
import { API_BASE_URL } from '../../config/config';

export async function GetAllPostsHandler(sortBy:string, page: number = 1, perPage: number = 10): Promise<Post[]>{
    //Gets posts to be displayed on home page
    try{
        const response = await fetch(`${API_BASE_URL}/api/posts${sortBy ? `?sort_by=${sortBy}` : '?'}&page=${page}&perPage=${perPage}`);
        if (!response.ok) {
            throw new Error('Failed to fetch posts');
        }
        const posts: Post[] = await response.json();
        return posts;
    } catch (error) {
        console.error('Error fetching posts:', error);
        throw error;
    }
}