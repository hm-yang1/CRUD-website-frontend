import * as React from 'react';
import Typography from '@mui/material/Typography';
import {useEffect, useState } from 'react';
import { Tag } from '../../../types/types';
import Button from '@mui/material/Button';
import { useLocation, useNavigate } from 'react-router-dom';
import { Box, Grid } from '@mui/material';
import GetAllTagsHandler from '../../../APIHandlers/tags/GetAllTagsHandler';

function TagButtonGrid(){
  //Tags filtering group in the side bar, handles getting the tags, and setting query params
  const navigate = useNavigate();
  const location = useLocation();
  const [availableTags, setAvaliableTags] = useState<Tag[]>([])
  const [isEditing, setIsEditing] = useState<boolean>(false);
  const [tagNames, setTagNames] = useState<string[]>([])
  useEffect(() => {
    //Fetch all tags
    GetAllTagsHandler()
        .then((tags) => setAvaliableTags(tags))
        .catch((error) => console.error('Error fetching tags:', error));
    
    //Check if tags are already selected from URL params
    if(window.location.pathname.startsWith('/filtered-posts')) {
      const params = new URLSearchParams(location.search);
      const tagNamesFromUrl = params.get('tags');
      const tagNamesArray = tagNamesFromUrl ? tagNamesFromUrl.split('&') : [];
      setTagNames(tagNamesArray);
    }
  }, []);

  function handleTagClick(tag: Tag): void {
      const isSelected = tagNames.includes(tag.name);
      if (isSelected) {
          setTagNames((prevTagNames) => 
              prevTagNames.filter((prevTag) => prevTag !== tag.name)
          );
      } else {
          setTagNames((prevTagNames) => [...prevTagNames, tag.name])
      }

      setIsEditing(true);
  }

  function handleCancelClick(): void {
      setTagNames([]);
      setIsEditing(false);
  }

  function handleSubmitClick(): void {
      console.log(`Submitted tags: ${tagNames}`);
      if(tagNames.length <= 0) {
        navigate('/');
        return;
      }
      const tagsString = tagNames.join('&');
      const queryParams = new URLSearchParams(location.search);
      queryParams.set('tags', tagsString);

      //Reload if already at filtered-posts page
      if (window.location.pathname.startsWith('/filtered-posts')) {
        navigate(`/filtered-posts?${queryParams.toString()}`);
        window.location.reload();
      } else {
        navigate(`/filtered-posts?${queryParams.toString()}`);
      }
  }
  return (
    <Box 
        display={'flex'} 
        flexDirection={'column'} 
        bgcolor="#f0f0f0" 
        p={3} 
        borderRadius={8} 
        justifyContent={'space-evenly'}
        alignItems={'left'}
        position={'sticky'}
    >
        <Typography 
            variant='h6' 
            marginBottom={1}
        >
            Tags:           
        </Typography>
      <Grid container spacing={2}>
        {availableTags.map((tag) => (
          <Grid item key={tag.name}>
            <Button
              variant={tagNames.includes(tag.name) ? 'contained' : 'outlined'}
              color='primary'
              onClick={() => handleTagClick(tag)}
            >
              {tag.name}
            </Button>
          </Grid>
        ))}
      </Grid>

      {isEditing && (
        <Box display={'flex'} style={{ padding: 16, marginTop: 16 }} borderRadius={4} bgcolor={'white'} justifyContent={'space-evenly'}>
          <Button color="primary" onClick={handleSubmitClick}>
            Submit
          </Button>
          <Button color="primary" onClick={handleCancelClick}>
            Cancel
          </Button>
        </Box>
      )}
    </Box>
  );
};

export default TagButtonGrid;
