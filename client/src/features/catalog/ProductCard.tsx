import { LoadingButton } from "@mui/lab";
import { Card, CardActions, CardContent, CardMedia, Typography } from "@mui/material";
import { Link } from "react-router-dom";
import { Product } from "../../app/models/product";
import { useAppDispatch, useAppSelector } from "../../app/store/configureStore";
import { currencyFormat } from "../../app/util/util";
import { addBasketItemAsync } from "../basket/basketSlice";
import ShoppingBasketIcon from '@mui/icons-material/ShoppingBasket';

interface Props {
    product: Product
}

export default function ProductCard({ product }: Props) {
    const { status } = useAppSelector(state => state.basket);
    const dispatch = useAppDispatch();

    return (

        <Card >
            <Link to={`/catalog/${product.id}`} onClick={() => window.scrollTo(0, 0)} style={{color: 'inherit', textDecoration: 'none' }}>
                <CardMedia
                    sx={{ height: 200, backgroundSize: 'contain', bgcolor: 'white' }}
                    image={product.pictureUrl}
                    title={product.name}
                />
                <CardContent sx={{'&:last-child': { pb: 0 }}}>
                    <Typography gutterBottom variant="subtitle2" component="div">
                        {product.name}
                    </Typography>
                    <Typography  color='primary' variant="subtitle1" sx={{ fontWeight: '500' }}>
                        {currencyFormat(product.price)}
                    </Typography>


                </CardContent>
            </Link>
            <CardActions>
                <LoadingButton
                    sx={{ backgroundColor: '#eaeaea', color: '#da653e', fontWeight: 'bold', pl: 1, pr: 1 }}
                    loading={status === 'pendingAddItem' + product.id}
                    onClick={() => dispatch(addBasketItemAsync({ productId: product.id }))}
                    size="small">
                        <ShoppingBasketIcon fontSize="small" sx={{mr: 1}}/>
                    Buy Now
                </LoadingButton>
            </CardActions>
        </Card>

    )
}