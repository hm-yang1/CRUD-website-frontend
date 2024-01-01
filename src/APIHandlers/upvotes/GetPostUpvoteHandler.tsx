import React, { useEffect, useState } from 'react';
import { API_BASE_URL } from '../../config/config';
import { Tag, Upvote, UpvoteRequest } from '../../types/types';
import { UseAuth } from '../../pages/Authentication/AuthContext';


export default async function GetPostUpvoteHandler(upvoteRequest: UpvoteRequest): Promise<boolean>{
    try {
        const response = await fetch(`${API_BASE_URL}/api/upvotes/posts/${upvoteRequest.postid}`, {
            method:'GET',
            credentials:'include'
        });
        if (!response.ok) {
            throw new Error('Failed to get upvote');
        }
        const returnedUpvote: Upvote = await response.json();
        return returnedUpvote.postid > 0;
    } catch(error){
        console.error('Error getting upvote:', error);
        throw error;
    }
}
