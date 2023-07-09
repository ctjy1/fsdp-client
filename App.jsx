import './App.css';
import { Container, AppBar, Toolbar, Typography, Box, Button } from '@mui/material';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import { useState, useEffect } from 'react';
import http from './http'
import Accounts from './pages/Accounts';
import AddAdminAccount from './pages/AddAdminAccount';
import AdminAccount from './pages/AdminAccounts';
import EditAdminAccount from './pages/EditAdminAccount';
import Register from './pages/Register';
import RegisterAdmin from './pages/RegisterAdmin';
import Login from './pages/Login';

function App() {
  const [user, setUser] = useState(null);

  const logout = () => {
    localStorage.clear();
    window.location = "/";
  };

  useEffect(() => {
    if (localStorage.getItem("accessToken")) {
      http.get('/user/auth').then((res) => {
        setUser(res.data.user);
      });
      setUser({ name: 'User' });
    }
  }, []);

  return (
    <Router>
      <AppBar position="static" className='AppBar'>
        <Container>
          <Toolbar disableGutters={true}>
            <Link to="/">
              <Typography variant="h6" component="div">
                BikeHub
              </Typography>
            </Link>
            <Link to="/accounts" ><Typography>Accounts</Typography></Link>
            <Link to="/adminaccount" ><Typography>Admin Accounts</Typography></Link>
            <Box sx={{ flexGrow: 1 }}></Box>
            {user && (
              <>
                <Typography>{user.name}</Typography>
                <Button onClick={logout}>Logout</Button>
              </>
            )
            }
            {!user && (
              <>
                <Link to="/register" ><Typography>Register</Typography></Link>
                <Link to="/login" ><Typography>Login</Typography></Link>
              </>
            )}

          </Toolbar>
        </Container>
      </AppBar>

      <Container>
        <Routes>
          <Route path={"/"} element={<Accounts />} />
          <Route path={"/accounts"} element={<Accounts />} />
          <Route path={"/addadminaccount"} element={<AddAdminAccount />} />
          <Route path={"/adminaccount"} element={<AdminAccount />} />
          <Route path={"/editadminaccount/:id"} element={<EditAdminAccount />} />
          <Route path={"/register"} element={<Register />} />
          <Route path={"/registerAdmin"} element={<RegisterAdmin />} />
          <Route path={"/login"} element={<Login />} />

        </Routes>
      </Container>
    </Router>
  );
}
export default App;
