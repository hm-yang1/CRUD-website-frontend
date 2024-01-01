import * as React from 'react';
import { Post, PostRequest } from '../../types/types'
import { API_BASE_URL } from '../../config/config';

export default async function CreatePostHandler(postRequest: PostRequest): Promise<Post> {
    console.log(postRequest);
    try {
        const response = await fetch(`${API_BASE_URL}/api/posts`, {
            method:'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(postRequest),
            credentials:'include'
        });
        if (!response.ok) {
            throw new Error('Failed to create post');
        }

        const createdPost: Post = await response.json();
        return createdPost;
    } catch (error) {
        console.error('Error creating post:', error);
        throw error;
    }
}