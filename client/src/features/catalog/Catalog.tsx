import { Box, Grid, Paper, Typography, useMediaQuery, useTheme } from "@mui/material";
import AppPagination from "../../app/components/AppPagination";
import AppPaginationMobile from "../../app/components/AppPaginationMobile";
import CheckboxButtons from "../../app/components/CheckboxButtons";
import RadioButtonGroup from "../../app/components/RadioButtonGroup";
import useProducts from "../../app/hooks/useProducts";
import LoadingComponent from "../../app/layout/LoadingComponent";
import { useAppDispatch, useAppSelector } from "../../app/store/configureStore";
import { setPageNumber, setProductParams } from "./catalogSlice";
import ProductList from "./ProductList";
import FormatListBulletedIcon from '@mui/icons-material/FormatListBulleted';
import GrainOutlinedIcon from '@mui/icons-material/GrainOutlined';

import * as React from 'react';
import OutlinedInput from '@mui/material/OutlinedInput';
import FormControl from '@mui/material/FormControl';
import Select, { SelectChangeEvent } from '@mui/material/Select';

const sortOptions = [
    { value: 'name', label: 'Alphabetical' },
    { value: 'priceDesc', label: 'Price - High to low' },
    { value: 'price', label: 'Price - Low to high' },
]

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

export default function Catalog() {
    const { products, brands, types, filtersLoaded, metaData } = useProducts();
    const { productParams, } = useAppSelector(state => state.catalog);
    const dispatch = useAppDispatch();
    const theme = useTheme();
    const isMatch = useMediaQuery(theme.breakpoints.down("md"));
    const [categoryName, setCategoryName] = React.useState<string[]>([]);

    if (!filtersLoaded) return <LoadingComponent message='Loading products...' />

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
            <Grid container columnSpacing={4}>
                {
                    isMatch ? (
                        <>
                        </>
                    ) : (
                        <>

                            <Grid sx={{ mt: 4 }} item xs={3}>

                                <Paper sx={{ mb: 2, p: 2 }}>
                                    <Box display='flex'>
                                        <FormatListBulletedIcon sx={{ mt: '3px' }} />
                                        <Typography variant='h6' sx={{ mb: 1, ml: 1, color: '#17a2b8' }}> Categories</Typography>
                                    </Box>

                                    <FormControl fullWidth>
                                    
                                        <Select
                                            labelId="demo-multiple-checkbox-label"
                                            id="demo-multiple-checkbox"
                                            fullWidth
                                            sx={{
                                                '& legend': { display: 'none' },
                                                '& fieldset': { top: 0 },
                                            }}
                                            displayEmpty
                                            multiple
                                            value={productParams.types}
                                            onChange={handleChange}
                                            input={<OutlinedInput label="Tag" />}
                                            renderValue={(selected) => selected.join(', ') || 'Select Category'}
                                            MenuProps={MenuProps}

                                        >
                                            <Box sx={{m: 1}}>
                                            <CheckboxButtons
                                                items={types}
                                                checked={productParams.types}
                                                onChange={(items: string[]) => dispatch(setProductParams({ types: items }))}
                                            />
                                            </Box>
                                        </Select>
                                    </FormControl>

                                </Paper>

                                <Paper sx={{ mb: 2, p: 2 }}>
                                    <Box display='flex'>
                                        <GrainOutlinedIcon sx={{ mt: '3px' }} />
                                        <Typography variant='h6' sx={{ mb: 1, ml: 1, color: '#9898ea' }}>Brands</Typography>
                                    </Box>

                                    <CheckboxButtons
                                        items={brands}
                                        checked={productParams.brands}
                                        onChange={(items: string[]) => dispatch(setProductParams({ brands: items }))}
                                    />
                                </Paper>

                                <Paper sx={{ mb: 2, p: 2 }}>
                                    <RadioButtonGroup
                                        selectedValue={productParams.orderBy}
                                        options={sortOptions}
                                        onChange={(e) => dispatch(setProductParams({ orderBy: e.target.value }))}
                                    />
                                </Paper>
                            </Grid>
                        </>
                    )
                }
                {
                    isMatch ? (
                        <>
                            <Grid item xs={12}>
                                <ProductList productsp={products} />
                            </Grid>
                        </>
                    ) : (
                        <>
                            <Grid sx={{ mt: 4 }} item xs={9}>
                                <ProductList productsp={products} />
                            </Grid>
                        </>
                    )
                }
                {
                    isMatch ? (
                        <>

                            <Grid item xs={12} sx={{ mb: 2, mt: 2 }}>
                                {metaData &&
                                    <AppPaginationMobile
                                        metaData={metaData}
                                        onPageChange={(page: number) => dispatch(setPageNumber({ pageNumber: page }))}
                                    />}
                            </Grid>
                        </>
                    ) : (
                        <>
                            <Grid item xs={3} />
                            <Grid item xs={9} sx={{ mb: 2 }}>
                                {metaData &&
                                    <AppPagination
                                        metaData={metaData}
                                        onPageChange={(page: number) => dispatch(setPageNumber({ pageNumber: page }))}
                                    />}
                            </Grid>
                        </>
                    )
                }


            </Grid>

        </>
    )
}