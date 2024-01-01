import * as React from 'react';
import { Comment, CommentRequest } from '../../types/types'
import { API_BASE_URL } from '../../config/config';

export default async function DeleteCommentHandler(commentID: number) {
    console.log(commentID);
    try {
        const response = await fetch(`${API_BASE_URL}/api/comments/${commentID}`, {
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