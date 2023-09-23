
import Drawer from '@mui/material/Drawer';
import * as React from 'react';
import MenuIcon from '@mui/icons-material/Menu';
import { IconButton, List, ListItem, ListItemButton } from "@mui/material";
import { NavLink } from "react-router-dom";
import { useAppSelector } from "../store/configureStore";
import SignedInMenu from "./SignedInMenu";


import ListItemIcon from '@mui/material/ListItemIcon';

const navStyles = {
  color: 'inherit',
  textDecoration: 'none',
  typography: 'h6',
  '&:hover': {
    color: 'grey.500'
  },
  '&.active': {
    color: '#707090'
  }
}

export default function DrawerMenu() {
  
  const { user } = useAppSelector(state => state.account);
  const [openDrawer, setOpenDrawer] = React.useState(false);
  const midLinks = [
    { title: 'shop', path: '/catalog' },
    { title: 'about', path: '/about' },
    { title: 'contact', path: '/contact' }
  ]

  const rightLinks = [
    { title: 'login', path: '/login' },
    { title: 'register', path: '/register' }
  ]


  return (
    <>
      <Drawer open={openDrawer} onClose={() => setOpenDrawer(false)}>
        <List>
          {midLinks.map(({ title, path }) => (


            <ListItemButton>
              <ListItemIcon>
                <ListItem
                  component={NavLink}
                  to={path}
                  key={path}
                  sx={navStyles}
                  onClick={() => setOpenDrawer(false)}
                >
                  {title.toUpperCase()}
                </ListItem>
              </ListItemIcon>

            </ListItemButton>



          ))}
          {user && user.roles?.includes('Admin') &&

            <ListItemButton>
              <ListItemIcon>
                <ListItem
                  component={NavLink}
                  to={'/inventory'}
                  sx={navStyles}
                  
                >
                  INVENTORY
                </ListItem>
              </ListItemIcon>
            </ListItemButton>
          }

        </List>
        <List>
          <ListItemButton>
            <ListItemIcon>
              {user ? (
                <SignedInMenu />
              ) : (
                <List sx={{ display: 'flex' }}>
                  {rightLinks.map(({ title, path }) => (
                    <ListItem
                      component={NavLink}
                      to={path}
                      key={path}
                      sx={navStyles}
                      onClick={() => setOpenDrawer(false)}
                    >
                      {title.toUpperCase()}
                    </ListItem>
                  ))}
                </List>
              )}
            </ListItemIcon>
          </ListItemButton>
        </List>

      </Drawer>
      <IconButton sx={{ color: 'white' }} onClick={() => setOpenDrawer(!openDrawer)}>
        <MenuIcon />
      </IconButton>
    </>
  )
}