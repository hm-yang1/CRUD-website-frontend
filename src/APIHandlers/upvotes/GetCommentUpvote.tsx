import React, { useEffect, useState } from 'react';
import { API_BASE_URL } from '../../config/config';
import { Tag, Upvote, UpvoteRequest } from '../../types/types';
import { error } from 'console';


export default async function GetCommentUpvoteHandler(upvoteRequest: UpvoteRequest): Promise<boolean>{
    try {
        const response = await fetch(`${API_BASE_URL}/api/upvotes/comments/${upvoteRequest.commentid}`, {
            method:'GET',
            credentials:'include'
        });
        if (!response.ok) {
            // console.error('Error getting upvote:',error)
            throw new Error('Failed to get upvote');
            return false;
        }
        const returnedUpvote: Upvote = await response.json();
        return returnedUpvote.commentid > 0;
    } catch(error){
        console.error('Error getting upvote:', error);
        // throw error;
        return false;
    }
}