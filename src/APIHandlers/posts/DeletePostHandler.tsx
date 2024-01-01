import * as React from 'react';
import { API_BASE_URL } from '../../config/config';
import { METHODS } from 'http';

export default async function DeletePostHandler(postid: number) {
    console.log(postid);
    try {
        const response = await fetch(`${API_BASE_URL}/api/posts/${postid}`, {
            method: 'DELETE',
            credentials: 'include'
        })
        if (!response.ok) {
            throw new Error("Failed to delete post");
        }
    } catch (error) {
        console.error('Error deleting post:', error);
        throw error;
    }
}