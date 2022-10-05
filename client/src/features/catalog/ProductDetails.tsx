import { LoadingButton } from "@mui/lab";
import { Box, Button, ButtonGroup, Container, createTheme, Divider, Grid, Table, TableBody, TableCell, TableContainer, TableRow, ThemeProvider, Typography } from "@mui/material";
import { useEffect, useState } from "react";
import { useParams } from "react-router";
import NotFound from "../../app/errors/NotFound";
import LoadingComponent from "../../app/layout/LoadingComponent";
import { useAppDispatch, useAppSelector } from "../../app/store/configureStore";
import { addBasketItemAsync, removeBasketItemAsync } from "../basket/basketSlice";
import { fetchProductAsync, productSelectors } from "./catalogSlice";

export default function ProductDetails() {
    const { basket, status } = useAppSelector(state => state.basket);
    const dispatch = useAppDispatch();
    const { id } = useParams<{ id: string }>();
    const product = useAppSelector(state => productSelectors.selectById(state, id));
    const { status: productStatus } = useAppSelector(state => state.catalog);
    const [quantity, setQuantity] = useState(1);
    const item = basket?.items.find(i => i.productId === product?.id);

    const theme = createTheme({
        palette: {
            action: {
                disabledBackground: '#f5f5f5',
                disabled: '#000'
              }}
      });

    useEffect(() => {
        if (item) setQuantity(item.quantity);
        if (!product) dispatch(fetchProductAsync(parseInt(id)))
    }, [id, item, dispatch, product]);

    function handleInputChange(event: any) {
        if (event.target.value > 0) {
            setQuantity(parseInt(event.target.value));
        }
    }

    function handleUpdateCart() {
        if (!item || quantity > item.quantity) {
            const updatedQuantity = item ? quantity - item.quantity : quantity;
            dispatch(addBasketItemAsync({ productId: product?.id!, quantity: updatedQuantity }))
        } else {
            const updatedQuantity = item.quantity - quantity;
            dispatch(removeBasketItemAsync({ productId: product?.id!, quantity: updatedQuantity }))
        }
    }

    if (productStatus.includes('pending')) return <LoadingComponent message='Loading product...' />

    if (!product) return <NotFound />

    return (
        <Container sx={{ mt: 4 }}>
            <Grid container spacing={6}>
                <Grid item xs={12} sm={6} md={4}>
                    <img src={product.pictureUrl} alt={product.name} style={{ width: '100%' }} />
                </Grid>
                <Grid item xs={12} sm={6} md={8} sx={{mb: 5}}>
                    <Typography variant='h4'>{product.name}</Typography>
                    <Divider sx={{ mb: 2 }} />
                    <Typography variant='h4' color='secondary'>${(product.price / 100).toFixed(2)}</Typography>
                    <TableContainer sx={{ mb: 3 }}>
                        <Table>
                            <TableBody>
                                <TableRow>
                                    <TableCell>Name</TableCell>
                                    <TableCell>{product.name}</TableCell>
                                </TableRow>
                                <TableRow>
                                    <TableCell>Description</TableCell>
                                    <TableCell>{product.description}</TableCell>
                                </TableRow>
                                <TableRow>
                                    <TableCell>Type</TableCell>
                                    <TableCell>{product.type}</TableCell>
                                </TableRow>
                                <TableRow>
                                    <TableCell>Brand</TableCell>
                                    <TableCell>{product.brand}</TableCell>
                                </TableRow>
                                <TableRow>
                                    <TableCell>Quantity in stock</TableCell>
                                    <TableCell>{product.quantityInStock}</TableCell>
                                </TableRow>
                            </TableBody>
                        </Table>
                    </TableContainer>

                    

                                <Box display='flex' >
                                <ButtonGroup size="small" variant="contained" aria-label="outlined button group">


                                    {<Button sx={{backgroundColor: '#4f4f65'}} size="small" disabled={quantity <= 1} onClick={() => {
                                        setQuantity(quantity - 1)
                                    }}>-</Button>}
                                    <ThemeProvider theme={theme}>
                                    {<Button sx={{backgroundColor: '#eaeaea'}} size="small" disabled onChange={handleInputChange}>{quantity}</Button>}
                                    </ThemeProvider>
                                    
                                    <Button sx={{backgroundColor: '#4f4f65'}} size="small" onClick={() => { setQuantity(quantity + 1) }}>+</Button>

                                </ButtonGroup>
                              
                                {/* <TextField
                                    variant='outlined'
                                    type='number'
                                    label='Quantity in Cart'
                                    fullWidth
                                    value={quantity}
                                    onChange={handleInputChange}
                                /> */}

                           


                     
                            
                            <LoadingButton
                                disabled={item?.quantity === quantity}
                                loading={status.includes('pending')}
                                onClick={handleUpdateCart}
                                sx={{ height: '40px', ml: 3}}
                                color='primary'
                                size='small'
                                variant='contained'
                                
                            >
                                {item ? 'Update Quantity' : 'Add to Cart'}
                            </LoadingButton>
                            </Box>
                     </Grid>  
            </Grid>
        </Container>
    )
}