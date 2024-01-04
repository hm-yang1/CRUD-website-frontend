import * as React from 'react';
import { Post } from '../../types/types'
import { API_BASE_URL } from '../../config/config';

export default async function GetPostByIdHandler(postid: number): Promise<Post | null>{
    //Gets post to be displayed by ViewPost
    try{
        const response = await fetch(`${API_BASE_URL}/api/posts/${postid}`);
        if(!response.ok) {
            throw new Error('Failed to fetch post by id');
        }

        const postData: Post = await response.json();
        return postData;
    } catch(error) {
        console.error('Error fetching post by id:', error);
        return null;
    }
}