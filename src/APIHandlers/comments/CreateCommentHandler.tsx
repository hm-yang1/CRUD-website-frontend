import * as React from 'react';
import { Comment, CommentRequest } from '../../types/types'
import { API_BASE_URL } from '../../config/config';

export default async function CreateCommentHandler(commentRequest:CommentRequest) {
    console.log(commentRequest);
    try {
        const response = await fetch(`${API_BASE_URL}/api/posts/${commentRequest.postid}/comments`, {
            method:'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(commentRequest),
            credentials:'include'
        });
        if (!response.ok) {
            throw new Error('Failed to create post');
        }

        const createdComment: CommentRequest = await response.json();
        return createdComment;
    } catch (error) {
        console.error('Error creating post:', error);
        throw error;
    }
}