import * as React from 'react';
import IconButton from '@mui/material/IconButton';
import Box from '@mui/material/Box';
import TagButtonGrid from '../../pages/Posts/Filtered/filter';
import AddBoxIcon from '@mui/icons-material/AddBox';
import { UseAuth } from '../../pages/Authentication/AuthContext';
import { useNavigate } from 'react-router-dom';
import { Button, Typography } from '@mui/material';


export default function SideBar() {
  const { isAuthenticated } = UseAuth();
  const navigate = useNavigate();

  function handleCreate(){
    isAuthenticated
      ? navigate('/posts/create')
      : navigate('/login')
  }
  return (
    <Box 
      style={{ paddingTop:70, position: 'sticky', top:0}}
      flex={1} 
      p={2} 
      sx={{ display: { xs: "none", sm: "block" } }}
    >
        <Button variant='contained' onClick={handleCreate} color='primary'>
          <Typography>
            Create Post
          </Typography>
        </Button>
        <TagButtonGrid/>
    </Box>
  );
}