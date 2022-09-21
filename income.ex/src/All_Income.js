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



export default function Insert_Income() {

const [users_id, setUsers_id ] = useState("");
const [date, setDate ] = useState("");
const [itemname, setItemname ] = useState("");
const [amount, setAmount ] = useState("");
const [incomeList, setIncomeList] = useState([]);

const [newDate, setNewDate ] = useState("");
const [newItemname, setNewItemname ] = useState("");
const [newAmount, setNewAmount ] = useState("");
const getIncome = () => {
  axios.get('http://localhost:3333/inex/'+ids).then((response) => {
    setIncomeList(response.data);
    return response.json();
    console.log(response.json)
  })
}



  return (
    <ThemeProvider theme={theme}>
    <Container component="main" maxWidth="xs">
      <CssBaseline />
      <button className='btn btn-primary' onClick={getIncome}>Manage income</button>
      {incomeList.map((val , key) => {
        return(
          <div className='income card'>
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
          
            <hr></hr>
            </div>
          </div>
        )
      })}
    </Container>
  </ThemeProvider>
  );
}