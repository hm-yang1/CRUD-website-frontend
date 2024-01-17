import * as React from 'react';
import { styled, alpha } from '@mui/material/styles';
import Button from '@mui/material/Button';
import Menu, { MenuProps } from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import Divider from '@mui/material/Divider';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import MenuIcon from '@mui/icons-material/Menu';
import { UseAuth } from '../../pages/Authentication/AuthContext';
import AddBoxIcon from '@mui/icons-material/AddBox';
import { IconButton, Typography } from '@mui/material';
import LoginIcon from '@mui/icons-material/Login';
import LogoutButton from '../../pages/Authentication/LogoutButton';
import { useNavigate } from 'react-router-dom';
import { ProfileDialog } from '../profile/profile';
import { useState } from 'react';

//For mobile view of topbar, currently work in progress

const StyledMenu = styled((props: MenuProps) => (
  <Menu
    elevation={0}
    anchorOrigin={{
      vertical: 'bottom',
      horizontal: 'right',
    }}
    transformOrigin={{
      vertical: 'top',
      horizontal: 'right',
    }}
    {...props}
  />
))(({ theme }) => ({
  '& .MuiPaper-root': {
    borderRadius: 6,
    marginTop: theme.spacing(1),
    minWidth: 180,
    color:
      theme.palette.mode === 'light' ? 'rgb(55, 65, 81)' : theme.palette.grey[300],
    boxShadow:
      'rgb(255, 255, 255) 0px 0px 0px 0px, rgba(0, 0, 0, 0.05) 0px 0px 0px 1px, rgba(0, 0, 0, 0.1) 0px 10px 15px -3px, rgba(0, 0, 0, 0.05) 0px 4px 6px -2px',
    '& .MuiMenu-list': {
      padding: '4px 0',
    },
    '& .MuiMenuItem-root': {
      '& .MuiSvgIcon-root': {
        fontSize: 18,
        color: theme.palette.text.secondary,
        marginRight: theme.spacing(1.5),
      },
      '&:active': {
        backgroundColor: alpha(
          theme.palette.primary.main,
          theme.palette.action.selectedOpacity,
        ),
      },
    },
  },
}));

export default function CustomizedMenus() {
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);
  const navigate = useNavigate();
  const [openProfile, setOpenProfile] = useState(false);

  const handleClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };
  const { isAuthenticated, AuthUsername } = UseAuth();

  function handleCreate(){
    isAuthenticated
      ? navigate('/posts/create')
      : navigate('/login')
  }
  const handleProfile = () => {
    setOpenProfile(!openProfile);
  }

  return (
    <div>
      <Button
        id="demo-customized-button"
        aria-controls={open ? 'demo-customized-menu' : undefined}
        aria-haspopup="true"
        aria-expanded={open ? 'true' : undefined}
        variant="contained"
        disableElevation
        onClick={handleClick}
      >
        <MenuIcon/>
      </Button>
      <StyledMenu
        id="demo-customized-menu"
        MenuListProps={{
          'aria-labelledby': 'demo-customized-button',
        }}
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
      >
        {isAuthenticated ? (
        <>
        <MenuItem onClick={handleCreate} disableRipple>
          <AddBoxIcon/>
          Create Post
        </MenuItem>
        <MenuItem onClick={handleProfile} disableRipple>
          <AccountCircleIcon sx ={{color:"white"}}/>
          Profile
        </MenuItem>
        <ProfileDialog 
          username = {AuthUsername}
          handleClose={handleProfile}
          isVisible={openProfile}
        />
        <Divider sx={{ my: 0.5 }} />
        <MenuItem onClick={handleClose} disableRipple>
          <LogoutButton/>
        </MenuItem>
        </>
        ) : (
          <>
            <IconButton href='/login'>
                <LoginIcon/>
                <Typography variant='body1' fontStyle='arial'>Login</Typography>
            </IconButton>
          </>
        )
      }
      </StyledMenu>
    </div>
  );
}