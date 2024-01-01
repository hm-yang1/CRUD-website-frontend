import * as React from 'react';
import { Comment, CommentRequest } from '../../types/types'
import { API_BASE_URL } from '../../config/config';

export default async function EditCommentHandler(commentRequest: CommentRequest, commentID: number) {
    try{
        const response = await fetch(`${API_BASE_URL}/api/comments/${commentID}`, {
            method:'PUT',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(commentRequest),
            credentials:'include'
        });
        if (!response.ok) {
            throw new Error('Failed to create post');
        }

        const editedComment: Comment = await response.json();
        return editedComment;
    } catch (error) {
        console.error('Error editing post:', error);
        throw error;
    }
}