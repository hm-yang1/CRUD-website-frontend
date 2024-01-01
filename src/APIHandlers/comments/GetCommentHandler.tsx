import * as React from 'react';
import { Comment } from '../../types/types'
import { API_BASE_URL } from '../../config/config';

export default async function GetCommentHanlder(commentID: number): Promise<Comment | null> {
    try{
        const response = await fetch(`${API_BASE_URL}/api/comments/${commentID}`);
        if(!response.ok) {
            throw new Error('Failed to fetch comment by id');
        }
        const commentData: Comment = await response.json();
        return commentData;
    } catch(error) {
        console.error('Error fetching comment by id:', error);
        return null;
    }
}

