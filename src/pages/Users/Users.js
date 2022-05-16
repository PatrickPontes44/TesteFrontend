import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';

import { useState, useEffect } from 'react';
import { toast } from 'react-toastify';
import { DataGrid, GridActionsCellItem } from '@mui/x-data-grid';
import { createTheme, ThemeProvider, styled } from '@mui/material/styles';
import { useNavigate } from "react-router-dom";
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';

import Form from '../../components/Form/Form';

export default function Users() {
    let navigate = useNavigate();
    
    const [data, setData] = useState([])
    const [edit, setEdit] = useState(false)
    const [editData, setEditData] = useState()
    
    useEffect(() => {
        const savedData = localStorage.getItem('users');
        if(savedData){
            const parsedData = JSON.parse(savedData)
            setData(parsedData)
        }else{
            setData([])
        }
        
    }, [])

    const deleteUser = (id)=>{
        const auxData = data.filter((item)=> item.id !== id);
        const stringifyData = JSON.stringify([auxData]);
        if(auxData.length === 0){
            localStorage.removeItem("users");
            setData([])
        }
        else{
            localStorage.setItem("users", stringifyData);
            setData(auxData)
        }
    }
    const editUser = (id)=>{
        const auxData = data.filter((item)=> item.id === id);
        setEditData(auxData[0])
        setEdit(true)
    }


    const columns = [
        {
            field: 'name',
            headerName: 'Nome Completo',
            width: 150,
            flex: 1,
            sortable:false,
            disableColumnMenu: true,
        },
        {
            field: 'cpf',
            headerName: 'CPF',
            width: 150,
            flex: 1,
            sortable:false,
            disableColumnMenu: true,
        },
        {
            field: 'phone',
            headerName: 'Telefone',
            width: 150,
            flex: 1,
            sortable:false,
            disableColumnMenu: true,
        },
        {
            field: 'email',
            headerName: 'E-mail',
            width: 150,
            flex: 1,
            sortable:false,
            disableColumnMenu: true,
        },
        {
            field: 'actions',
            type: 'actions',
            width: 80,
            getActions: (params) => [
              <GridActionsCellItem
                icon={<EditIcon />}
                label="Editar Usuário"
                onClick={(evt)=> editUser(params.id)}
              />,
              <GridActionsCellItem
                icon={<DeleteIcon />}
                label="Deletar Usuário"
                onClick={(evt)=> deleteUser(params.id)}
              />,
            ],
          },
    ];

    const defaultTheme = createTheme();

    const Table = styled(DataGrid)({
        fontSize: 'clamp(1.2rem, 1.1vw, 1.4rem)',
        '& .MuiDataGrid-detailPanels .MuiDataGrid-detailPanel':{
            overflowY: 'scroll',
        },
        '& .MuiDataGrid-columnHeaders, .MuiDataGrid-pinnedColumnHeaders':{
            lineHeight: 'normal !important',
            backgroundColor: defaultTheme.palette.secondary.dark,
            color: defaultTheme.palette.secondary.contrastText,
            '&:hover':{
                backgroundColor: defaultTheme.palette.secondary.main,
            },
            '& .MuiDataGrid-iconSeparator':{
                color: defaultTheme.palette.secondary.contrastText,
            },
        }
      });
 
    return (
        <ThemeProvider theme={defaultTheme}>
            <Box sx={{
                width: '100%',
                height: '100%',
                backgroundColor: "#ecf0f1",
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                padding: '1rem',
            }}>
                <Paper elevation={3}
                    sx={{
                    width: '100%', height: '100%',
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'flex-start',
                    justifyContent: 'flex-start',
                    padding: '2rem',
                    gap:'1rem',
                }}>
                    {
                        edit ?
                        <Box sx={{
                            width: '100%',
                            height: '100%',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            position: 'fixed',
                            top: 0,
                            left: 0,
                            zIndex: 999,
                        }}>
                            <Form editMode={true} 
                            closeFunction={(changedData)=> {
                                setData(changedData)
                                setEdit(false);
                                setEditData(undefined);
                            }} 
                            id={editData.id} cpf={editData.cpf} name={editData.name} email={editData.email} tel={editData.phone} hideUsersBtn={true} />
                        </Box>
                        :
                        null
                    }
                    {
                        data.length > 0 ?
                        <Box style={{ 
                            width: '100%',
                            height: '100%',
                            display: 'flex',
                            flexDirection: 'column',
                            gap: '1rem'
                        }}>
                            <Table
                            rows={data}
                            columns={columns}
                            pageSize={5}
                            rowsPerPageOptions={[5]}
                            disableSelectionOnClick
                            />
                        </Box>
                        :
                        <Typography variant="h3" component="div">
                            Sem Dados Cadastrados
                        </Typography>
                    }
                    <Button variant="outlined" color="secondary" 
                        sx={{
                            fontSize: 'clamp(1.2rem, 1.4vw, 1.4rem)',
                            width: 'fit-content',
                            '@media (max-width: 780px)' : {
                                width: '100%',
                            },
                        }}
                        onClick={()=> navigate("/", { replace: false })}
                    >
                        Voltar
                    </Button>
                </ Paper>
            </Box>
        </ ThemeProvider>
    );
}

