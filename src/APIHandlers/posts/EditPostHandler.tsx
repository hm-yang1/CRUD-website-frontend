import * as React from 'react';
import { Post, PostRequest } from '../../types/types'
import { API_BASE_URL } from '../../config/config';
import { error } from 'console';

export default async function EditPostHandler(postRequest:PostRequest, postid:number):Promise<Post> {
    try{
        const response = await fetch(`${API_BASE_URL}/api/posts/${postid}`, {
            method:'PUT',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(postRequest),
            credentials:'include'
        });
        if (!response.ok) {
            throw new Error('Failed to create post');
        }

        const editedPost: Post = await response.json();
        return editedPost;
    } catch (error) {
        console.error('Error editing post:', error);
        throw error;
    }
}