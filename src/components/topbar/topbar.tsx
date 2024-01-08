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
import SearchBar from '../../pages/Posts/Searched/SearchBar';

const StyledToolbar = styled(Toolbar) ({
  display:"flex",
  position:"sticky",
  justifyContent:"space-between",
  backgroundColor:"ghostwhite",
})

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
    <AppBar>
      <StyledToolbar>
        <IconButton onClick={handleHome}>
          <Typography variant='h6' sx={{color:'white', display:{xs: "none", sm:"block"}}}>
            GoodForumName
          </Typography>        
          <HomeIcon sx={{color:"white"}}/>
        </IconButton>
        <Box
          display={'flex'}
          justifyContent={'center'}
          alignContent={'center'}
          width={'60%'}
        >
          <SearchBar/>
        </Box>
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