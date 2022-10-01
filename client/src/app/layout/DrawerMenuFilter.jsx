
import Drawer from '@mui/material/Drawer';
import * as React from 'react';
import FilterListIcon from '@mui/icons-material/FilterList';
import { IconButton, List, ListItem, ListItemButton } from "@mui/material";



import { Typography, Box } from "@mui/material";
import { useForm } from "react-hook-form";
import useProducts from "../../app/hooks/useProducts";
import { useAppDispatch } from "../../app/store/configureStore";

import { setProductParams } from "../../features/catalog/catalogSlice";
import Select from '@mui/material/Select';

import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';


export default function DrawerMenuFilter() {

  const { brands, types } = useProducts();
  const dispatch = useAppDispatch();

  const [openDrawer, setOpenDrawer] = React.useState(false);
  const { control } = useForm({
    mode: 'all'

  });
  



  return (
    <>
      <Drawer anchor='right' open={openDrawer} onClose={() => setOpenDrawer(false)}>
      <Typography variant='subtitle2' sx={{m: 2}}>Filter By</Typography>
        <Box sx={{ width: '100%', maxWidth: 360, bgcolor: 'background.paper' }}>
          <nav aria-label="main mailbox folders">
            <List>


              <ListItem disablePadding>
                <ListItemButton style={{ minWidth: 200 }}>
                  
                  <FormControl fullWidth>
                    <InputLabel id="brand">Brand</InputLabel>
                    <Select
                      items={brands}
                      name='brand'
                      label="Brand"
                      control={control}
                      onChange={(e) => {dispatch(setProductParams({ brands: e.target.value })); setOpenDrawer(false)}}
                      
                    >
                      {brands.map((item, index) => (
                        <MenuItem key={index} value={item}>{item}</MenuItem>
                      ))}
                    </Select>
                  </FormControl>
                </ListItemButton>
              </ListItem>

              <ListItemButton style={{ minWidth: 200 }}>
                <FormControl fullWidth>
                  <InputLabel id="type">Type</InputLabel>
                  <Select
                    items={types}
                    name='type'
                    label="Types"
                    control={control}
                    onChange={(e) => {dispatch(setProductParams({ types: e.target.value })); setOpenDrawer(false)}}
                    
                  >
                    {types.map((item, index) => (
                      <MenuItem key={index} value={item}>{item}</MenuItem>
                    ))}
                  </Select>
                </FormControl>
              </ListItemButton>




            </List></nav></Box>



      </Drawer>
      <IconButton sx={{ color: 'black' }} onClick={() => setOpenDrawer(!openDrawer)}>
        <FilterListIcon />
      </IconButton>
    </>
  )
}