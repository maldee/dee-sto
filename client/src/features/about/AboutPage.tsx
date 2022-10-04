import { Alert, AlertTitle, Button, ButtonGroup, Container, List, ListItem, ListItemText, Typography } from "@mui/material";
import { useState } from "react";
import agent from "../../app/api/agent";

export default function AboutPage() {
    
    return (
        <Container sx={{mt: 4}}>
            <Typography gutterBottom variant='h5'>About DeeStore</Typography>
            <Typography gutterBottom variant='body1'>Copyright © Deeflow Global</Typography>
            <Typography gutterBottom variant='body2'>Founded: September 2022</Typography>
        </Container>
    )
}