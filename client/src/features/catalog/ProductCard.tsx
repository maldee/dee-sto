import { LoadingButton } from "@mui/lab";
import { Button, Card, CardActions, CardContent, CardHeader, CardMedia, Typography } from "@mui/material";
import { Link } from "react-router-dom";
import { Product } from "../../app/models/product";
import { useAppDispatch, useAppSelector } from "../../app/store/configureStore";
import { currencyFormat } from "../../app/util/util";
import { addBasketItemAsync } from "../basket/basketSlice";

interface Props {
    product: Product
}

export default function ProductCard({ product }: Props) {
    const {status} = useAppSelector(state => state.basket);
    const dispatch = useAppDispatch();

    return (
        <Card>
            <CardHeader
                
                title={product.name}
                titleTypographyProps={{
                    sx: { fontSize:'medium', fontWeight: 'bold', color: '#4f4f65' }
                }}
            />
            <CardMedia
                sx={{ height: 200, backgroundSize: 'contain', bgcolor: 'white' }}
                image={product.pictureUrl}
                title={product.name}
            />
            <CardContent>
                <Typography gutterBottom color='primary' variant="h5" sx={{fontWeight: '500'}}>
                    {currencyFormat(product.price)}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                    {product.brand} / {product.type}
                </Typography>
            </CardContent>
            <CardActions>
                <LoadingButton
                    loading={status === 'pendingAddItem' + product.id}
                    onClick={() => dispatch(addBasketItemAsync({productId: product.id}))}
                    size="small">
                    Add to cart
                </LoadingButton>
                <Button component={Link} to={`/catalog/${product.id}`} size="small">View</Button>
            </CardActions>
        </Card>
    )
}