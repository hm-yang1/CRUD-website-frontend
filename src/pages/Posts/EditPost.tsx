import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Post, Tag, PostRequest } from '../../types/types';
import GetPostById from '../../APIHandlers/posts/GetPostByIdHandler';
import PostCard from '../../components/posts/PostCard';
import Box from '@mui/material/Box';
import Topbar from '../../components/topbar/topbar';
import { Button, ButtonGroup, Container, Stack, TextField, Typography } from '@mui/material';
import PostCards from '../../components/posts/PostCards';
import Sidebar from '../../components/sidebar/sidebar';
import GetAllTagsHandler from '../../APIHandlers/tags/GetAllTagsHandler';
import CreatePostHandler from '../../APIHandlers/posts/CreatePostHandler';
import { UseAuth } from '../Authentication/AuthContext';
import { redirect } from 'react-router-dom';
import EditPostHandler from '../../APIHandlers/posts/EditPostHandler';

export default function EditPost(){
    //Displayed when post owner edits post
    const navigate = useNavigate();
    const { postid } = useParams<{postid: string}>();
    const postIdNumber = parseInt(postid ?? '', 10);
    const { AuthUsername } = UseAuth();
    const [availableTags, setAvaliableTags] = useState<Tag[]>([])
    const [postData, setPostData] = useState<PostRequest>({
        username: AuthUsername,
        tags: [] as string[],
        title: '',
        description:'',
    })
    //Get original post
    useEffect(() => {
        const fetchPostData =async () => {
            try{
                const originalPost = await GetPostById(postIdNumber);
                if (originalPost?.username === AuthUsername) {
                    //Checks if the person editing is the post owner
                    setPostData({
                        username: AuthUsername,
                        tags: originalPost.tags,
                        title: originalPost.title,
                        description: originalPost.description
                    })
                } else {
                    navigate('/');
                }
            } catch (error) {
                console.error('Error fetching post data:', error);
            }
        }
        fetchPostData();
    }, [postIdNumber]);
    useEffect(() => {
        GetAllTagsHandler()
            .then((tags) => setAvaliableTags(tags))
            .catch((error) => console.error('Error fetching tags:', error))
    }, []);
    
    function handleTagClick(tag: Tag){
        const updatedTags = postData.tags.includes(tag.name)
            ? postData.tags.filter((t) => t !== tag.name)
            : [...postData.tags, tag.name];
        setPostData((prevData) => ({...prevData, tags: updatedTags}));
    }

    async function handleEditPost(){
        try{
            const editedPost = await EditPostHandler(postData, postIdNumber);
            console.log('Edited Post:', editedPost)
            navigate(`/posts/${editedPost.postid}`)
        } catch (error) {
            console.error('Error editing post:', error);
        }
    }
    return (
        <>
        <Topbar/>
        <Container maxWidth="md">
            <Box mt={5}>
                <Typography variant='h4' gutterBottom>
                    Edit your post
                </Typography>
                <TextField
                    autoFocus
                    label="Title"
                    fullWidth
                    margin='normal'
                    value={postData.title}
                    onChange={(e) => setPostData({...postData, title: e.target.value})}
                />
                <Box mt={2}>
                    <Typography variant='subtitle1'>Tags:</Typography>
                    <ButtonGroup>
                        {availableTags.map((tag) => (
                            <Button 
                                key={tag.tagid}
                                variant={postData.tags.includes(tag.name) ? 'contained' : 'outlined'}
                                onClick = {() => handleTagClick(tag)}
                            >
                                {tag.name}
                            </Button>
                        ))}
                    </ButtonGroup>
                </Box>
                <TextField
                    label="Description"
                    fullWidth
                    multiline
                    rows = {4}
                    margin='normal'
                    value={postData.description}
                    onChange={(e) => setPostData({...postData, description:e.target.value})}
                />
                <Box mt={3}>
                    <Button
                        variant='contained'
                        color='primary'
                        onClick={() => handleEditPost()}
                    >
                        Update Post
                    </Button>
                </Box>
            </Box>
        </Container>
        </>
    )
}