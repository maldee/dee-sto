import { Button, Divider, Grid, Typography } from "@mui/material";
import { Link } from "react-router-dom";
import { useAppSelector } from "../../app/store/configureStore";
import BasketSummary from "./BasketSummary";
import BasketTable from "./BasketTable";

export default function BasketPage() {
    const { basket } = useAppSelector(state => state.basket);

    if (!basket) return <Typography variant='h3'>Your basket is empty</Typography>

    return (
        <>
            <BasketTable items={basket.items} />
            <Divider sx={{mb: 5}}/>
            <Grid container>
                
                <Typography variant='h6' sx={{mb: 2}}>Order Summery</Typography>
                <Grid item xs={12} sm={6} md={12} />
                
                <Grid item xs={12} sm={6} md={6} sx={{mb: 5}}>
                    <BasketSummary />
                    <Divider sx={{mb: 3}}/>
                    <Button
                        component={Link}
                        to='/checkout'
                        variant='contained'
                        size='large'
                        fullWidth
                    >
                        Checkout
                    </Button>
                </Grid>
            </Grid>
        </>

    )
}