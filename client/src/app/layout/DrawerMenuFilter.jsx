
import Drawer from '@mui/material/Drawer';
import * as React from 'react';
import FilterListIcon from '@mui/icons-material/FilterList';
import { ShoppingCart } from "@mui/icons-material";
import { Badge, IconButton, List, ListItem, ListItemButton } from "@mui/material";
import { Link, NavLink } from "react-router-dom";
import { useAppSelector } from "../store/configureStore";
import SignedInMenu from "./SignedInMenu";



import ListItemIcon from '@mui/material/ListItemIcon';
import { Typography, Grid, Paper, Box, Button } from "@mui/material";
import { useEffect } from "react";
import { FieldValues, useForm } from "react-hook-form";
import AppDropzone from "../../app/components/AppDropzone";
import AppSelectList from "../../app/components/AppSelectList";
import AppTextInput from "../../app/components/AppTextInput";
import useProducts from "../../app/hooks/useProducts";
import { Product } from "../../app/models/product";
import { yupResolver } from '@hookform/resolvers/yup';
import { validationSchema } from "../../features/admin/productValidation";
import agent from "../../app/api/agent";
import { useAppDispatch } from "../../app/store/configureStore";

import { LoadingButton } from "@mui/lab";
import ListItemText from '@mui/material/ListItemText';
import Divider from '@mui/material/Divider';
import InboxIcon from '@mui/icons-material/Inbox';
import { setPageNumber, setProductParams } from "../../features/catalog/catalogSlice";
import Select, { SelectChangeEvent } from '@mui/material/Select';

import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';

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

export default function DrawerMenuFilter() {

  const { products, brands, types, filtersLoaded, metaData } = useProducts();
  const { productParams, } = useAppSelector(state => state.catalog);
  const dispatch = useAppDispatch();

  const [openDrawer, setOpenDrawer] = React.useState(false);
  const { control, reset, handleSubmit, watch, formState: { isDirty, isSubmitting } } = useForm({
    mode: 'all'

  });
  const [brand, setBrand] = React.useState('');



  return (
    <>
      <Drawer anchor='right' open={openDrawer} onClose={() => setOpenDrawer(false)}>

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
                      onChange={(e) => dispatch(setProductParams({ brands: e.target.value }))}
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
                    onChange={(e) => dispatch(setProductParams({ types: e.target.value }))}
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