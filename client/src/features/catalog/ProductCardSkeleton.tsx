import {
    Card,
    CardActions,
    CardContent,
    Grid,
    Skeleton
} from "@mui/material";

export default function ProductCardSkeleton() {
    return (
        <Grid item xs component={Card}>
           
            <Skeleton sx={{ height: 190 }} animation="wave" variant="rectangular" />
            <CardContent>
                <>
                    <Skeleton animation="wave" height={20} style={{ marginBottom: 6 }} />
                    <Skeleton animation="wave" height={20} width="80%" />
                </>
            </CardContent>
            <CardActions>
                <>
                    <Skeleton animation="wave" height={40} width='40%' />
                   
                </>
            </CardActions>
        </Grid>
    )
}