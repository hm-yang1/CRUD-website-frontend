import * as React from 'react';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import Checkbox from '@mui/material/Checkbox';
import IconButton from '@mui/material/IconButton';
import CommentIcon from '@mui/icons-material/Comment';
import Box from '@mui/material/Box';
import TagButtonGrid from './filter';

export default function SideBar() {

  return (
    <Box 
      style={{ paddingTop:70, position: 'sticky', top:0}}
      flex={1} 
      p={2} 
      sx={{ display: { xs: "none", sm: "block" } }}
    >
        <TagButtonGrid/>
    </Box>
  );
}