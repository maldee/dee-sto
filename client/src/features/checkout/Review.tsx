import { Divider, Grid } from '@mui/material';
import Typography from '@mui/material/Typography';
import { useAppSelector } from '../../app/store/configureStore';
import BasketSummary from '../basket/BasketSummary';
import BasketTable from '../basket/BasketTable';

export default function Review() {
  const { basket } = useAppSelector(state => state.basket);
  return (
    <>
      <Typography variant="h6" gutterBottom>
        Order summary
      </Typography>
      {basket &&
        <BasketTable items={basket.items} isBasket={false} />}
      <Divider sx={{ mb: 3 }} />
      <Grid container>
        <Typography variant='h6' sx={{ mb: 2 }}>Order Summery</Typography>
        <Grid item xs={12} sm={6} md={12} />
        <Grid item xs={12} sm={6} md={6} sx={{ mb: 5 }}>
          <BasketSummary />
        </Grid>
      </Grid>
    </>
  );
}