import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Tag, PostRequest } from '../../types/types';
import Box from '@mui/material/Box';
import Topbar from '../../components/topbar/topbar';
import { Button, ButtonGroup, Container, Stack, TextField, Typography } from '@mui/material';
import GetAllTagsHandler from '../../APIHandlers/tags/GetAllTagsHandler';
import CreatePostHandler from '../../APIHandlers/posts/CreatePostHandler';
import { UseAuth } from '../Authentication/AuthContext';

export default function CreatePost(){
    //Page to create post
    const navigate = useNavigate();
    const {isAuthenticated, AuthUsername} = UseAuth();
    const [titleError, setTitleError] = useState('');
    const [descriptionError, setDescriptionError] = useState('');
    const [postData, setPostData] = useState<PostRequest>({
        username: AuthUsername,
        tags: [] as string[],
        title: '',
        description:'',
    })
    const [availableTags, setAvaliableTags] = useState<Tag[]>([])
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

    async function handleCreatePost(){
        if (!postData.title.trim()) {
            setTitleError('Title cannot be empty!');
            return;
        }
      
        if (!postData.description.trim()) {
            setDescriptionError('Description cannot be empty!');
            return;
        }
        try{
            const createdPost = await CreatePostHandler(postData);
            console.log('Created Post:', createdPost)
            navigate(`/posts/${createdPost.postid}`)
        } catch (error) {
            console.error('Error creating post:', error);
        }
    }
    if (!isAuthenticated) {
        navigate('/login');
    }
    return (
        <>
        <Topbar/>
        <Box 
            marginTop={'80px'}
        />
        <Container maxWidth="md">
            <Box mt={5}>
                <Typography variant='h4' gutterBottom>
                    Create a new post
                </Typography>
                <TextField
                    autoFocus
                    label="Title"
                    fullWidth
                    margin='normal'
                    value={postData.title}
                    onChange={(e) => {
                        setPostData({...postData, title: e.target.value});
                        setTitleError('');
                    }}
                />
                {titleError && <p>{titleError}</p>}
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
                    onChange={(e) => {
                        setPostData({...postData, description:e.target.value});
                        setDescriptionError('');
                    }}
                />
                {descriptionError && <p>{descriptionError}</p>}
                <Box mt={3}>
                    <Button
                        variant='contained'
                        color='primary'
                        onClick={() => handleCreatePost()}
                    >
                        Create Post
                    </Button>
                </Box>
            </Box>
        </Container>
        </>
    )
}