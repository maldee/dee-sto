
import Drawer from '@mui/material/Drawer';
import * as React from 'react';
import FilterListIcon from '@mui/icons-material/FilterList';
import { IconButton, List, ListItem, ListItemButton } from "@mui/material";



import { Typography, Box } from "@mui/material";

import useProducts from "../../app/hooks/useProducts";
import { useAppDispatch, useAppSelector } from "../../app/store/configureStore";

import { setProductParams } from "../../features/catalog/catalogSlice";


import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';


import OutlinedInput from '@mui/material/OutlinedInput';
import FormControl from '@mui/material/FormControl';
import Select, { SelectChangeEvent } from '@mui/material/Select';
import CheckboxButtons from '../components/CheckboxButtons';

const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
  PaperProps: {
    style: {
      maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
      width: 250,
    },
  },
};

export default function DrawerMenuFilter() {

  const { brands, types } = useProducts();
  const { productParams, } = useAppSelector(state => state.catalog);
  const dispatch = useAppDispatch();

  const [openDrawer, setOpenDrawer] = React.useState(false);

  const [categoryName, setCategoryName] = React.useState<string[]>([]);


  const handleChange = (event: SelectChangeEvent<typeof categoryName>) => {
    const {
      target: { value },
    } = event;
    setCategoryName(
      // On autofill we get a stringified value.
      typeof value === 'string' ? value.split(',') : value,
    );
  };


  return (
    <>
      <Drawer anchor='right' open={openDrawer} onClose={() => setOpenDrawer(false)}>
        <Typography variant='subtitle2' sx={{ m: 2 }}>Filter By</Typography>
        <Box sx={{ width: '100%', maxWidth: 360, bgcolor: 'background.paper' }}>
          <nav aria-label="main mailbox folders">
            <List>


              <ListItem disablePadding>
                <ListItemButton style={{ minWidth: 270 }}>

                  <FormControl fullWidth>
                    <InputLabel id="brand">Brand</InputLabel>
                    <Select
                      name='brand'
                      label="Brand"

                      onChange={(e) => { dispatch(setProductParams({ brands: e.target.value })); setOpenDrawer(false) }}

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
                 
                  <Select
                    name='category'
                    label="Category"
                    sx={{
                      '& legend': { display: 'none' },
                      '& fieldset': { top: 0 },
                    }}
                    displayEmpty
                    multiple
                    value={productParams.types}
                    onChange={handleChange}
                    input={<OutlinedInput label="Tag" />}
                    renderValue={(selected) => selected.join(', ') || 'Category'}
                    MenuProps={MenuProps}

                  >
                    
                    <Box sx={{ m: 1}}>
                      <CheckboxButtons 
                        items={types}
                        checked={productParams.types}
                        onChange={(items: string[]) => dispatch(setProductParams({ types: items }))}
                      />
                    </Box>


                  </Select>
                </FormControl>
              </ListItemButton>




            </List></nav></Box>



      </Drawer>
      <IconButton sx={{ color: 'black' }} onClick={() => setOpenDrawer(!openDrawer)}>
        <FilterListIcon color='primary'/>
      </IconButton>
    </>
  )
}