import { Box, useMediaQuery, useTheme } from "@mui/material";
import DrawerMenuFilter from "../../app/layout/DrawerMenuFilter";
import { Product } from "../../app/models/product";
import { useAppSelector } from "../../app/store/configureStore";
import ProductCard from "./ProductCard";
import ProductCardSkeleton from "./ProductCardSkeleton";
import Select from '@mui/material/Select';
import { useAppDispatch } from "../../app/store/configureStore";
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import { setProductParams } from "../../features/catalog/catalogSlice";
import Masonry, { ResponsiveMasonry } from "react-responsive-masonry"

interface Props {
    productsp: Product[];
}

export default function ProductList({ productsp }: Props) {
    const { productsLoaded } = useAppSelector(state => state.catalog);
    const theme = useTheme();
    const isMatch = useMediaQuery(theme.breakpoints.down("md"));

    const dispatch = useAppDispatch();


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
                                    sx={{ color: 'gray' }}
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

            <ResponsiveMasonry
                columnsCountBreakPoints={{ 350: 2, 750: 3, 900: 4 }}
            >
                <Masonry columnsCount={4} gutter="10px">
                    {productsp.map((product, i) => (
                        <div key={i}>
                            {!productsLoaded ? (
                                <ProductCardSkeleton />
                            ) : (
                                <ProductCard product={product} />
                            )}
                        </div>
                    ))}
                </Masonry>
            </ResponsiveMasonry>

        </>


    )
}