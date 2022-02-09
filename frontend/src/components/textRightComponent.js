import * as React from 'react'
import Card from '@mui/material/Card';
import Typography from '@mui/material/Typography';


export const TextRightComponent = (props) => {
    return(
        <Card sx={{ p:2, borderRadius:2, bgcolor: '#78f500' , m:2, width:'70%', marginRight:'auto'}}>
            <Typography>
                This is a text message
            </Typography>
        </Card>
    )
}