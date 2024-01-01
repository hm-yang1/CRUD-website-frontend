import * as React from 'react';
import { Comment } from '../../types/types'
import { API_BASE_URL } from '../../config/config';

export async function GetCommentsHandler(postId: number, sortBy:string): Promise<Comment[]>{
    try{
        const response = await fetch(`${API_BASE_URL}/api/posts/${postId}/comments${sortBy ? `?sort_by=${sortBy}` : ''}`);
        if (!response.ok) {
            throw new Error('Failed to fetch posts');
        }
        const comments: Comment[] = await response.json();
        return comments;
    } catch (error) {
        console.error('Error fetching posts:', error);
        throw error;
    }
}