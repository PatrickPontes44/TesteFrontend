import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';

import { useState } from 'react';
import { toast } from 'react-toastify';
import { useNavigate } from "react-router-dom";


export default function Form(props) {
    let navigate = useNavigate();
    const hideUsersBtn = props.hideUsersBtn;
    const editMode = props.editMode;
    const closeFunction = props.closeFunction;
    const [id, setId] = useState(props.id ? props.id : "")
    const [cpf, setCPF] = useState(props.cpf ? props.cpf : "")
    const [tel, setTel] = useState(props.cpf ? props.tel : "")
    const [name, setName] = useState(props.cpf ? props.name : "")
    const [email, setEmail] = useState(props.cpf ? props.email : "")

    function getRndInteger(min, max) {
        return Math.floor(Math.random() * (max - min + 1) ) + min;
      }

    const handleSubmit = (evt) =>{
        evt.preventDefault();
        const randomID = "x" + getRndInteger(1, 9999);

        const savedData = localStorage.getItem('users');
        const processedData = {
            'id': randomID,
            'name': name,
            'cpf': cpf,
            'phone': tel,
            'email': email
        }
        if(savedData){
            const parsedData = JSON.parse(savedData)
            parsedData.push(processedData);
            const stringifyData =  JSON.stringify(parsedData);
            localStorage.setItem("users", stringifyData)
        }else{
            const stringifyData = JSON.stringify([processedData]);
            localStorage.setItem("users", stringifyData)
        }
        toast.success('Usuário Cadastrado');
        setCPF("");
        setTel("");
        setName("");
        setEmail("");
    }

    const handleSubmitEdit = (evt) =>{
        evt.preventDefault();
        const savedData = localStorage.getItem('users');
        const processedData = {
            'id': id,
            'name': name,
            'cpf': cpf,
            'phone': tel,
            'email': email
        }
        const parsedData = JSON.parse(savedData)
        const auxData = parsedData.map((item)=> {
            if(item.id === id){
                item = processedData
            }
            return item
        });
        const stringifyData =  JSON.stringify(auxData);
        localStorage.setItem("users", stringifyData)

        toast.success('Usuário Alterado');
        setId("");
        setCPF("");
        setTel("");
        setName("");
        setEmail("");

        closeFunction(auxData);
    }

    return (
        <Box
            component="form"
            sx={{
                width: '100%',
                height: '100%',
                backgroundColor: "#ecf0f1",
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                padding: '1rem'
            }}
            onSubmit={editMode ? handleSubmitEdit : handleSubmit}
        >
            <Paper elevation={3}
                sx={{
                width: '50%', height: 'fit-content',
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'flex-start',
                justifyContent: 'flex-start',
                padding: '2rem',
                '@media (max-width: 780px)' : {
                    width: '80%'
                },
                '@media (max-width: 375px)' : {
                    width: '90%'
                },
            }}
                >
                    {
                        editMode ? 
                        <Typography variant="h3" component="div">
                            Editar usuário
                        </Typography>
                        :
                        <Typography variant="h3" component="div">
                            Cadastrar novo usuário
                        </Typography>
                    }
                
                <Box sx={{
                    width: '100%',
                    margin: '2rem 0',
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'flex-start',
                    justifyContent: 'flex-start',
                    gap: '1.5rem'
                }}>
                    <TextField
                        label='Nome Completo' variant='outlined' type='text'
                        color='secondary'
                        sx={{width: '100%', fontSize: 'clamp(1.4rem, 1.5vw, 1.8rem)', '& .MuiOutlinedInput-root': {fontSize: 'clamp(1.4rem, 1.5vw, 1.8rem)'}, '& label':{fontSize: 'clamp(1.4rem, 1.5vw, 1.8rem)'}}}
                        value={name}
                        onChange={(evt)=> {
                            setName(evt.target.value)
                        }}
                    />
                    <TextField
                        label='CPF' variant='outlined' type='number' 
                        inputProps={{ inputMode: 'numeric', pattern: '[0-9]*'}}
                        color='secondary'
                        sx={{width: '100%', fontSize: 'clamp(1.4rem, 1.5vw, 1.8rem)', '& .MuiOutlinedInput-root': {fontSize: 'clamp(1.4rem, 1.5vw, 1.8rem)'}, '& label':{fontSize: 'clamp(1.4rem, 1.5vw, 1.8rem)'}}}
                        value={cpf}
                        error={cpf !== "" && cpf.length !== 11}
                        onChange={(evt)=> {
                            if(evt.target.value.length > 11){
                                toast.error('Números de CPF devem conter apenas 11 dígitos');
                            }else{
                                setCPF(evt.target.value)
                            }

                        }}
                    />
                    <TextField
                        label='Telefone' placeholder='(xx) xxxxxxxx' variant='outlined' type='number' 
                        inputProps={{ inputMode: 'numeric', pattern: "[0-9]{3}-[0-9]{3}-[0-9]{4}"}}
                        color='secondary'
                        sx={{width: '100%', fontSize: 'clamp(1.4rem, 1.5vw, 1.8rem)', '& .MuiOutlinedInput-root': {fontSize: 'clamp(1.4rem, 1.5vw, 1.8rem)'}, '& label':{fontSize: 'clamp(1.4rem, 1.5vw, 1.8rem)'}}}
                        value={tel}
                        onChange={(evt)=> {
                            setTel(evt.target.value)
                        }}
                    />
                    <TextField
                        label='E-mail' variant='outlined' type='email'
                        color='secondary'
                        sx={{width: '100%', fontSize: 'clamp(1.4rem, 1.5vw, 1.8rem)', '& .MuiOutlinedInput-root': {fontSize: 'clamp(1.4rem, 1.5vw, 1.8rem)'}, '& label':{fontSize: 'clamp(1.4rem, 1.5vw, 1.8rem)'}}}
                        value={email}
                        onChange={(evt)=> {
                            setEmail(evt.target.value)
                        }}
                    />
                    <Box sx={{
                        width: '100%',
                        marginTop: '2rem',
                        display: 'flex',
                        alignItems: 'flex-start',
                        justifyContent: 'flex-start',
                        gap: '1.5rem',
                        '@media (max-width: 780px)' : {
                            flexDirection: 'column',
                            alignItems: 'center',
                        },
                    }}>
                        <Button variant="contained" color="secondary" type="submit" 
                            sx={{
                                fontSize: 'clamp(1.2rem, 1.4vw, 1.4rem)',
                                '@media (max-width: 780px)' : {
                                    width: '100%',
                                },
                            }}
                        >
                            {
                                editMode ? 
                                "Editar Usuário"
                                :
                                "Cadastrar Usuário"
                            }
                        </Button>

                        <Button variant="outlined" color="secondary" 
                            sx={{
                                display: hideUsersBtn ? 'none' : 'unset',
                                fontSize: 'clamp(1.2rem, 1.4vw, 1.4rem)',
                                '@media (max-width: 780px)' : {
                                    width: '100%',
                                },
                            }}
                            onClick={()=> navigate("/users", { replace: false })}
                        >
                            Usuários Cadastrados
                        </Button>
                    </Box>
                </Box>
            </ Paper>
        </ Box>
    );
}
