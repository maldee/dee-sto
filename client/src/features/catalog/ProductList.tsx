import { Box, Grid,useMediaQuery, useTheme } from "@mui/material";
import DrawerMenuFilter from "../../app/layout/DrawerMenuFilter";
import { Product } from "../../app/models/product";
import { useAppSelector } from "../../app/store/configureStore";
import ProductCard from "./ProductCard";
import ProductCardSkeleton from "./ProductCardSkeleton";

import Select, { SelectChangeEvent } from '@mui/material/Select';

import useProducts from "../../app/hooks/useProducts";

import { yupResolver } from '@hookform/resolvers/yup';
import { validationSchema } from "../../features/admin/productValidation";
import agent from "../../app/api/agent";
import { useAppDispatch } from "../../app/store/configureStore";

import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import { FieldValues, useForm } from "react-hook-form";
import * as React from 'react';
import { setPageNumber, setProductParams } from "../../features/catalog/catalogSlice";

interface Props {
    productsp: Product[];
}

const sortOptions = [
    { value: 'name', label: 'Alphabetical' },
    { value: 'priceDesc', label: 'Price - High to low' },
    { value: 'price', label: 'Price - Low to high' },
]

export default function ProductList({ productsp }: Props) {
    const { productsLoaded } = useAppSelector(state => state.catalog);
    const theme = useTheme();
    const isMatch = useMediaQuery(theme.breakpoints.down("md"));
    
    const { products, brands, types, filtersLoaded, metaData } = useProducts();
    const { productParams, } = useAppSelector(state => state.catalog);
    const dispatch = useAppDispatch();
    const { control, reset, handleSubmit, watch, formState: { isDirty, isSubmitting } } = useForm({
        mode: 'all'
    
      });
      const [brand, setBrand] = React.useState('');

    return (
        

        <>
          
            {
            isMatch ? (
                <>
                <Box display='flex' justifyContent="space-between">
                <FormControl sx={{ m: 1, minWidth: 60 }} size="small">
                   
                    <Select
                    variant="standard"
                    disableUnderline={true}
                    defaultValue={'name'}
                    sx={{color: 'gray'}}
                    onChange={(e) => dispatch(setProductParams({ orderBy: e.target.value }))}
                    >
                        <MenuItem value={'name'}>New to Old</MenuItem>
                        <MenuItem value={'priceDesc'}>Price High to Low</MenuItem>
                        <MenuItem value={'price'}>Price Low to High</MenuItem>
                      
                    </Select>
                  </FormControl>
                  <DrawerMenuFilter />
                  </Box>
                 
                  
                </>
            ) : (
                <>
                </>
        )}
                
          
            <Grid container spacing={4}>
                {productsp.map(product => (
                    <Grid item xs={12} sm={6} md={4} key={product.id}>
                        {!productsLoaded ? (
                            <ProductCardSkeleton />
                        ) : (
                            <ProductCard product={product} />
                        )}
                    </Grid>
                ))}
            </Grid>
        </>


    )
}