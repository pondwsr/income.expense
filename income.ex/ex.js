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

const theme = createTheme();
const id = localStorage.getItem("id");



export default function Insert_Income() {


  const handleSubmit = (event) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
   const jsonData = {
    users_id:id,
    date: data.get('date'),
    itemname: data.get('itemname'),
    amount: data.get('amount'),
   }

fetch('http://localhost:3333/insert_income', {

  method: 'POST',
  headers: {
    'Content-Type': 'application/json',
  },
  body: JSON.stringify(jsonData),
})
  .then((response) => response.json())
  .then((data) => {
      if (data.status == 'OK'){
          alert('Insert success')
      }else{
        alert('Insert failed')
      }
    console.log('Success:', data);
  })
  .catch((error) => {
    console.error('Error:', error);
  });
  
  };

const [incomeList, setIncomeList] = useState([]);
const getIncome = () => {
  fetch('http://localhost:3333/users/'+id).then((response) => {
    setIncomeList(response.data);
    return response.json();
    console.log(response.json)
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
         Add Income
        </Typography>
        <Box component="form" noValidate onSubmit={handleSubmit} sx={{ mt: 3 }}>
          <Grid container spacing={2}>
            <Grid item xs={12} sm={12}>
            <input type="date" id="date" name="date" />
            </Grid>
            <Grid item xs={12} sm={12}>
              <TextField
                required
                fullWidth
                id="itemname"
                label="Item Name"
                name="itemname"
                
              />
            </Grid>
        
            <Grid item xs={12}>
              <TextField
                required
                fullWidth
                name="amount"
                label="Amount"
                id="amount"
              />
            </Grid>
          </Grid>
          <Button
            type="submit"
            fullWidth
            variant="contained"
            sx={{ mt: 3, mb: 2 }}
          >
            Add income
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
      <button className='btn btn-primary' onClick={getIncome}>Show income</button>
      {incomeList.map((val , key) => {
        return(
          <div className='income card'>
            <div className='card-body text-left'>
              <p className='card-text'>Date: {val.date}</p>
              <p className='card-text'>Date: {val.itemname}</p>
              <p className='card-text'>Date: {val.amount}</p>
            </div>
          </div>
        )
      })}
    </Container>
  </ThemeProvider>
  );
}