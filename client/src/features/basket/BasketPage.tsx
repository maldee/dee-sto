import { Button, Divider, Grid, Typography } from "@mui/material";
import { Link } from "react-router-dom";
import { useAppSelector } from "../../app/store/configureStore";
import BasketSummary from "./BasketSummary";
import BasketTable from "./BasketTable";

export default function BasketPage() {
    const { basket } = useAppSelector(state => state.basket);

    if (!basket) return <Typography variant='h6'>Your basket is empty</Typography>

    if (basket.items.length < 1 ) return <Typography sx={{mt: 4}} variant='h6'>Your basket is empty</Typography>

    return (
        <>
            <BasketTable items={basket.items} />
            <Divider sx={{ mb: 3 }} />
            <Grid container>

                <Typography variant='h6' sx={{ mb: 2 }}>Order Summery</Typography>
                <Grid item xs={12} sm={6} md={12} />

                <Grid item xs={12} sm={6} md={6} sx={{ mb: 5 }}>
                    <BasketSummary />
                    <Divider sx={{ mb: 3 }} />
                    {basket.items.length >= 1 &&
                        <Button
                            component={Link}
                            to='/checkout'
                            variant='contained'
                            size='large'
                            fullWidth
                        >
                            Checkout
                        </Button>
                    }
                    {basket.items.length < 1 &&
                        <Button
                            disabled
                            component={Link}
                            to='/checkout'
                            variant='contained'
                            size='large'
                            fullWidth
                        >
                            Checkout
                        </Button>
                    }
                </Grid>
            </Grid>
        </>

    )
}