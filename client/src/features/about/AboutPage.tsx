import { Container, Typography } from "@mui/material";

export default function AboutPage() {
    
    return (
        <Container sx={{mt: 4}}>
            <Typography gutterBottom variant='h5'>About DeeStore</Typography>
            <Typography gutterBottom variant='body1'>Copyright © Deeflow Global</Typography>
            <Typography gutterBottom variant='body2'>Founded: September 2022</Typography>
        </Container>
    )
}