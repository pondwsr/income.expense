import * as React from 'react';
import { useState } from 'react';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import Link from '@mui/material/Link';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import axios from 'axios';
const theme = createTheme();
const ids = localStorage.getItem("id");



export default function Insert_expense() {

const [users_id, setUsers_id ] = useState("");
const [date, setDate ] = useState("");
const [itemname, setItemname ] = useState("");
const [amount, setAmount ] = useState("");
const [expenseList, setexpenseList] = useState([]);

const [newDate, setNewDate ] = useState("");
const [newItemname, setNewItemname ] = useState("");
const [newAmount, setNewAmount ] = useState("");
const getexpense = () => {
  axios.get('http://localhost:3333/expense/'+ids).then((response) => {
    setexpenseList(response.data);
    return response.json();
    console.log(response.json)
  })
}
 const addexpense = () => {
  axios.post('http://localhost:3333/insert_expense', {
   users_id: ids,
   date: date,
   itemname: itemname,
   amount: amount
  }).then(() => {
    setexpenseList([
      ...expenseList, 
      {
        users_id: ids,
        date: date,
        temname: itemname,
        amount: amount
      }
    ])
  })
 }

 const updateexpense = (id) => {
  axios.put('http://localhost:3333/update_expense',{date: newDate, itemname: newItemname, amount: newAmount, id: id}).then((response) => {
setexpenseList(
  expenseList.map((val) => {
    return val.id == id ? {
      id: val.id,
      date: val.newDate,
      itemname: val.newItemname,
      amount: val.newAmount
    } : val;
  })
)
  })
 }

 const deleteexpense = (id) => {
  axios.delete(`http://localhost:3333/deleteexpense/${id}`).then((response) => {
    setexpenseList.filter((val) => {
      return val.id != id;
    })
  })
 }
  return (
    <ThemeProvider theme={theme}>
    <Container component="main" maxWidth="xs">
      <CssBaseline />
      <Box
        sx={{
          marginTop: 8,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
        }}
      >
      
        <Typography component="h1" variant="h1">
         Add expense
        </Typography>
        <Box component="form" noValidate sx={{ mt: 3 }}>
          <Grid container spacing={2}>
            <Grid item xs={12} sm={12}>
            <input onChange={(event) =>{
              setDate(event.target.value)
            }} type="date" id="date" name="date" />
            </Grid>
            <Grid item xs={12} sm={12}>
              <TextField
                required
                fullWidth
                id="itemname"
                label="Item Name"
                name="itemname"
                onChange={(event) =>{
                  setItemname(event.target.value)
                }}
              />
            </Grid>
        
            <Grid item xs={12}>
              <TextField
                required
                fullWidth
                name="amount"
                label="Amount"
                id="amount"
                onChange={(event) =>{
                  setAmount(event.target.value)
                }}
              />
            </Grid>
          </Grid>
          <Button type="submit"fullWidth variant="contained" sx={{ mt: 3, mb: 2 }} onClick={addexpense}>
            Add expense
          </Button>
          <Grid container justifyContent="flex-end">
            <Grid item>
              <Link href="/Daily" variant="body2">
        Back
              </Link>
            </Grid>
          </Grid>
        </Box>
      </Box>
      <button className='btn btn-primary' onClick={getexpense}>Show expense</button>
      {expenseList.map((val , key) => {
        return(
          <div className='expense card'>
            <div className='card-body text-left'>
              <p className='card-text'>Date: {val.date}</p>
              <input onChange={(event) => {
              setNewDate(event.target.value)
            }}  type="date" placeholder={val.date}></input>

             <p className='card-text'>Item Name: {val.itemname}</p>
              <input onChange={(event) => {
              setNewItemname(event.target.value)
            }}  type="text" placeholder={val.itemname}></input>

            <p className='card-text'>Amount: {val.amount}</p>
            <input onChange={(event) => {
              setNewAmount(event.target.value)
            }}  type="number" placeholder={val.amount}></input>
            <button onClick={() => {updateexpense(val.id)}}>Update</button>
            <button onClick={() => {deleteexpense(val.id)}}>Delete</button>
            <hr></hr>
            </div>
          </div>
        )
      })}
    </Container>
  </ThemeProvider>
  );
}