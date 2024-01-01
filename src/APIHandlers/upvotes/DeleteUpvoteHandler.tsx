import React, { useEffect, useState } from 'react';
import { API_BASE_URL } from '../../config/config';
import { Tag, Upvote, UpvoteRequest } from '../../types/types';

export default async function DeleteUpvoteHandler(upvoteRequest: UpvoteRequest) {
    console.log(upvoteRequest);
    try {
        const response = await fetch(`${API_BASE_URL}/api/upvotes/remove`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(upvoteRequest),
            credentials: 'include'
        });
        if (!response.ok) {
            throw new Error('Failed to add upvote')
        }
        console.log(response.status);
    } catch (error) {
        console.error('Error creating deleting upvote:', error);
        throw error;
    }
}