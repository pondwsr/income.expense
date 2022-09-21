import  React ,{useEffect} from 'react';
import AppBar from '@mui/material/AppBar';
import Button from '@mui/material/Button';
import CameraIcon from '@mui/icons-material/PhotoCamera';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import CssBaseline from '@mui/material/CssBaseline';
import Grid from '@mui/material/Grid';
import Stack from '@mui/material/Stack';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import Link from '@mui/material/Link';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import LocalAtmIcon from '@mui/icons-material/LocalAtm';

const theme = createTheme();
export default function Daily() {
    useEffect(() => {
        const token = localStorage.getItem('token')
        fetch('http://localhost:3333/authen', {

  method: 'POST',
  headers: {
    'Content-Type': 'application/json',
    'Authorization':  'Bearer '+token
  },

})
  .then((response) => response.json())
  .then((data) => {
      if (data.status == 'ok'){
          
      }else{
    
        window.location = '/Login'
        localStorage.removeItem('token');
      }
    console.log('Success:', data);
  })
  .catch((error) => {
    console.error('Error:', error);
  });
    }, [])

    const handleLogout = (event) => {
        event.preventDefault();
        localStorage.removeItem('token');
        window.location = '/Login'
      }
    const name = localStorage.getItem('name');
      
    
  return (
    
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <AppBar position="relative">
        <Toolbar>
        <LocalAtmIcon sx={{ mr: 2 }}/>
          <Typography variant="h6" color="inherit" noWrap>
           Hi {name}
          </Typography>
          <Button variant="contained" onClick={handleLogout} color="error">Logout</Button>
        </Toolbar>
      </AppBar>
      <main>
       
        <Container sx={{ py: 8 }} maxWidth="md">
       
        <Button color="success" href="/Income">Income</Button>
        <Button color="error" href="/Expense">Expense</Button>
        </Container>
      </main>
      
    </ThemeProvider>
  );
}