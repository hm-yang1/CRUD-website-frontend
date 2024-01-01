import * as React from 'react';
import { styled, alpha } from '@mui/material/styles';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import InputBase from '@mui/material/InputBase';
import AccountCircle from '@mui/icons-material/AccountCircle';
import HomeIcon from '@mui/icons-material/Home';
import LoginIcon from '@mui/icons-material/Login';
import Logout from '../../pages/Authentication/LogoutButton';
import { useNavigate } from 'react-router';
import CustomizedMenus from './CustomizedMenu';
import { UseAuth } from '../../pages/Authentication/AuthContext';
import AddBoxIcon from '@mui/icons-material/AddBox';

const StyledToolbar = styled(Toolbar) ({
  display:"flex",
  justifyContent:"space-between"
})

const Search = styled('div')(({ theme }) => ({
  backgroundColor: alpha(theme.palette.common.white, 0.15),
  '&:hover': {
    backgroundColor: alpha(theme.palette.common.white, 0.25),
  },
  padding:"0 10px",
  borderRadius: theme.shape.borderRadius,
  width: "40%"
}));

const StyledInputBase = styled(InputBase)(({ theme }) => ({
  color: 'inherit',
  '& .MuiInputBase-input': {
    padding: theme.spacing(1, 1, 1, 0),
    // vertical padding + font size from searchIcon
    transition: theme.transitions.create('width'),
    width: '100%',
    [theme.breakpoints.up('md')]: {
      width: '20ch',
    },
  },
}));

const IconsContainter = styled(Box)(({ theme }) => ({
  display:"none",
  gap:"5px",
  alignItems:"center",
  [theme.breakpoints.up("sm")]:{
    display:"flex"
  }
}));

const MenuContainer = styled(Box)(({ theme }) => ({
  display:"flex",
  [theme.breakpoints.up("sm")]:{
    display:"none"
  }
}));

const StyledIconButton = styled(IconButton)(({ theme }) => ({
  color:"white",
  display:"none",
}));


export default function Topbar() {
  const { isAuthenticated } = UseAuth();
  const navigate = useNavigate();

  function handleHome(){
    navigate('/');
  }

  function handleCreate(){
    isAuthenticated
      ? navigate('/posts/create')
      : navigate('/login')
  }

  return (
    <Box
      marginBottom={1}
      >
    <AppBar position = "sticky">
      <StyledToolbar>
        <IconButton onClick={handleHome}>
          <Typography variant='h6' sx={{color:'white', display:{xs: "none", sm:"block"}}}>
            GoodForumName
          </Typography>        
          <HomeIcon sx={{color:"white"}}/>
        </IconButton>
        <Search>
          <StyledInputBase placeholder='Search...'/>
        </Search>
        <IconsContainter>
          <IconButton sx ={{color:"white"}} onClick={handleCreate}>
            <AddBoxIcon/>
          </IconButton>
          {!isAuthenticated ? (
              <IconButton href='/login'>
                <LoginIcon sx ={{color:"white"}}/>
                <Typography variant='body1' fontStyle='arial' color={'white'}>Login</Typography>
              </IconButton>
            ) : (
              <>
              <IconButton>
                <AccountCircle sx ={{color:"white"}}/>
              </IconButton>
              <Logout/>
              </>
            )
          }
        </IconsContainter>
        <MenuContainer>
          <CustomizedMenus/>
        </MenuContainer>
      </StyledToolbar>
    </AppBar>
    </Box>
  )
}