import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';

import { useState, useEffect } from 'react';
import { toast } from 'react-toastify';


export default function Users() {
    const [data, setData] = useState()
    useEffect(() => {
        const savedData = localStorage.getItem('users');
        if(savedData){
            const parsedData = JSON.parse(savedData)
            setData(parsedData)
        }else{
            setData(undefined)
        }

    }, [])
    
    return (
        <Box sx={{
            width: '100%',
            height: '100%',
            backgroundColor: "#ecf0f1",
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            padding: '1rem'
        }}>
            <Paper elevation={3}
                sx={{
                width: '50%', height: 'fit-content',
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'flex-start',
                justifyContent: 'flex-start',
                padding: '2rem'
            }}>
                {
                    data ?
                    <Typography variant="h3" component="div">
                        Cadastrar novo usuário
                    </Typography>
                    :
                    <Typography variant="h3" component="div">
                        Sem Dados Cadastrados
                    </Typography>
                }
            </ Paper>
        </Box>
    );
}

