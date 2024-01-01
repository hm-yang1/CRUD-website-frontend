import * as React from 'react';
import Card from '@mui/material/Card';
import CardHeader from '@mui/material/CardHeader';
import CardContent from '@mui/material/CardContent';
import IconButton, { IconButtonProps } from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import { red } from '@mui/material/colors';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import ButtonBase from '@mui/material/ButtonBase';
import { ReactNode, useEffect, useState } from 'react';
import { Post, Tag } from '../../types/types';
import Button from '@mui/material/Button';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import ThumbUpIcon from '@mui/icons-material/ThumbUp';
import { UseAuth } from '../../pages/Authentication/AuthContext';
import MenuItem from '@mui/material/MenuItem';
import Menu from '@mui/material/Menu';
import AddCommentRoundedIcon from '@mui/icons-material/AddCommentRounded';
import { Box, Grid, Paper } from '@mui/material';
import GetAllTagsHandler from '../../APIHandlers/tags/GetAllTagsHandler';

function TagButtonGrid(){
  const navigate = useNavigate();
  const location = useLocation();
  const [availableTags, setAvaliableTags] = useState<Tag[]>([])
  const [isEditing, setIsEditing] = useState<boolean>(false);
  const [tagNames, setTagNames] = useState<string[]>([])
  useEffect(() => {
    GetAllTagsHandler()
        .then((tags) => setAvaliableTags(tags))
        .catch((error) => console.error('Error fetching tags:', error))
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
      const tagsString = tagNames.join('&');
      const queryParams = new URLSearchParams(location.search);
      queryParams.set('tags', tagsString);
      navigate(`/filtered-posts?${queryParams.toString()}`);
      window.location.reload();
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
              color='secondary'
              onClick={() => handleTagClick(tag)}
            >
              {tag.name}
            </Button>
          </Grid>
        ))}
      </Grid>

      {isEditing && (
        <Box display={'flex'} style={{ padding: 16, marginTop: 16 }} borderRadius={4} bgcolor={'white'} justifyContent={'space-evenly'}>
          <Button color="secondary" onClick={handleSubmitClick}>
            Submit
          </Button>
          <Button color="secondary" onClick={handleCancelClick}>
            Cancel
          </Button>
        </Box>
      )}
    </Box>
  );
};

export default TagButtonGrid;
