import * as React from 'react';
import { styled } from '@mui/material/styles';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import AccountCircle from '@mui/icons-material/AccountCircle';
import ImportantDevicesIcon from '@mui/icons-material/ImportantDevices';
import LoginIcon from '@mui/icons-material/Login';
import { useNavigate } from 'react-router';
import CustomizedMenus from './CustomizedMenu';
import { UseAuth } from '../../pages/Authentication/AuthContext';
import AddBoxIcon from '@mui/icons-material/AddBox';
import SearchBar from '../../pages/Posts/Searched/SearchBar';
import LogoutButton from '../../pages/Authentication/LogoutButton';
import { useState } from 'react';
import { ProfileDialog } from '../profile/profile';
import { Tooltip } from '@mui/material';

const TopbarContainer = styled(Box)({
  position: 'fixed',
  width: '100%',
  top: 0,
  zIndex: 10,
});

const StyledToolbar = styled(Toolbar) ({
  display:"flex",
  justifyContent:"space-between",
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
  const { isAuthenticated, AuthUsername } = UseAuth();
  const navigate = useNavigate();
  const [openProfile, setOpenProfile] = useState(false);

  function handleHome(){
    navigate('/');
  }

  function handleCreate(){
    isAuthenticated
      ? navigate('/posts/create')
      : navigate('/login')
  }

  const handleProfile = () => {
    setOpenProfile(!openProfile);
  }
  
  return (
    <TopbarContainer>
    <AppBar 
      position='sticky'
      color='primary'
      style={{ top: 0, zIndex: 100 }}
    >
      <StyledToolbar>
        <IconButton onClick={handleHome}>
          <Typography variant='h5' sx={{display:{xs: "none", sm:"block"}}} marginRight={1}>
            Web Forum
          </Typography>        
          <ImportantDevicesIcon/>
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
          <Tooltip title='Create Post'>
            <IconButton onClick={handleCreate}>
              <AddBoxIcon/>
            </IconButton>
          </Tooltip>
          {!isAuthenticated ? (
              <IconButton href='/login'>
                <LoginIcon/>
                <Typography variant='body1' fontStyle='arial'>Login</Typography>
              </IconButton>
            ) : (
              <>
              <Tooltip title='Profile'>
              <IconButton onClick={handleProfile}>
                <AccountCircle/>
              </IconButton>
              </Tooltip>
              <ProfileDialog 
                username = {AuthUsername}
                handleClose={handleProfile}
                isVisible={openProfile}
              />
              <LogoutButton/>
              </>
            )
          }
        </IconsContainter>
        <MenuContainer>
          <CustomizedMenus/>
        </MenuContainer>
      </StyledToolbar>
    </AppBar>
    </TopbarContainer>
  )
}