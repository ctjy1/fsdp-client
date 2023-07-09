import React from 'react'
import { Box, Typography, TextField, Button } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { useFormik } from 'formik';
import * as yup from 'yup';
import http from '../http';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function Login() {
    const navigate = useNavigate();
    const formik = useFormik({
        initialValues: {
            email: "",
            password: "",

        },
        validationSchema: yup.object({
            email: yup
                .string()
                .email('Invalid email address')
                .required('Email is required.'),
    
            password: yup
                .string()
                .trim()
                .min(8, 'Password must be at least 8 characters')
                .max(50, 'Password can be at most 50 characters')
                .required('Password is required.'),
          
        }),
        onSubmit: (data) => {
            data.email = data.email.trim().toLowerCase();
            data.password = data.password.trim();
            http.post("/user/login", data)
                .then((res) => {
                    localStorage.setItem("accessToken", res.data.accessToken);
                    console.log(res.data);
                    navigate("/login");
                    window.location.reload();
                })
                .catch(function (err) {
                    console.log(err.response);
                    toast.error(`${err.response.data.message}`);
                });
        }
    });


    return (
        <Box sx={{
            marginTop: 8,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center'
        }}>
            <Typography variant="h5" sx={{ my: 2 }}>
                Register
            </Typography>
            <Box component="form" sx={{ maxWidth: '500px' }} onSubmit={formik.handleSubmit}>

                <TextField
                    fullWidth margin="normal" autoComplete="off"
                    label="Email"
                    name="email"
                    value={formik.values.email}
                    onChange={formik.handleChange}
                    error={formik.touched.email && Boolean(formik.errors.email)}
                    helperText={formik.touched.email && formik.errors.email}
                />

                <TextField
                    fullWidth margin="normal" autoComplete="off"
                    label="Password"
                    name="password" type="password"
                    value={formik.values.password}
                    onChange={formik.handleChange}
                    error={formik.touched.password && Boolean(formik.errors.password)}
                    helperText={formik.touched.password && formik.errors.password}
                />

                <Button fullWidth variant="contained" sx={{ mt: 2 }}
                    type="submit">
                    Login
                </Button>
                
            </Box>
            <ToastContainer />
        </Box>
    )
}

export default Login