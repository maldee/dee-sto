import { LoadingButton } from "@mui/lab";
import { Button, Card, CardActionArea, CardActions, CardContent, CardHeader, CardMedia, Typography } from "@mui/material";
import { Link } from "react-router-dom";
import { Product } from "../../app/models/product";
import { useAppDispatch, useAppSelector } from "../../app/store/configureStore";
import { currencyFormat } from "../../app/util/util";
import { addBasketItemAsync } from "../basket/basketSlice";
import RemoveRedEyeIcon from '@mui/icons-material/RemoveRedEye';

interface Props {
    product: Product
}

export default function ProductCard({ product }: Props) {
    const { status } = useAppSelector(state => state.basket);
    const dispatch = useAppDispatch();

    return (

        <Card >
            <Link to={`/catalog/${product.id}`} style={{ textDecoration: 'none' }}>
                <CardMedia
                    sx={{ height: 200, backgroundSize: 'contain', bgcolor: 'white' }}
                    image={product.pictureUrl}
                    title={product.name}
                />
                <CardContent sx={{'&:last-child': { pb: 0 }}}>
                    <Typography gutterBottom variant="subtitle2" component="div">
                        {product.name}
                    </Typography>
                    <Typography gutterBottom color='primary' variant="subtitle1" sx={{ fontWeight: '500' }}>
                        {currencyFormat(product.price)}
                    </Typography>


                </CardContent>
            </Link>
            <CardActions>
                <LoadingButton
                    sx={{ backgroundColor: '#f7f7f7', color: '#da653e', fontWeight: 'bold', pl: 1, pr: 1 }}
                    loading={status === 'pendingAddItem' + product.id}
                    onClick={() => dispatch(addBasketItemAsync({ productId: product.id }))}
                    size="small">
                    Add to cart
                </LoadingButton>
            </CardActions>
        </Card>

    )
}