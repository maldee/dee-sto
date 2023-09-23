import { Box, Button, Container, Divider, Typography } from "@mui/material";
import { Link } from "react-router-dom";

export default function NotFound() {
    return (
        <Container sx={{mt: 4}}>
            <Typography gutterBottom variant='h5'>Oops - we could not find what you are looking for</Typography>
            <Divider />
            <Box sx={{ m: 2 }} /> 
            <Button variant="contained" component={Link} to='/catalog'>Go back to shop</Button>
        </Container>
    )
}