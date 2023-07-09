import React from 'react'
import { Box, Typography, TextField, Button } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { useFormik } from 'formik';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import * as yup from 'yup';
import http from '../http';

function RegisterAdmin() {
    const navigate = useNavigate();
    const formik = useFormik({
        initialValues: {
            secretCode: "",
            name: "",
            adminID: "",
            email: "",
            role: "",
            password: "",
            confirmPassword: ""
        },
        validationSchema: yup.object({
            secretCode: yup
              .string()
              .oneOf(["BikeHub2023"], 'Invalid secret code')
              .nullable()
              .required('Secret code is required.'),
            name: yup
              .string()
              .trim()
              .min(2, 'Name must be at least 2 characters')
              .max(50, 'Name must be at most 50 characters')
              .nullable()
              .required('Name is required.'),
            adminID: yup
              .string()
              .trim()
              .matches(/^(\d{6}[A-Z])$/, 'Admin ID should be in the format eg. 111111A')
              .required('Admin ID is required.'),
            email: yup
              .string()
              .email('Invalid email address')
              .required('Email is required.'),
            role: yup.string().required('Description of role is required.'),
            password: yup
              .string()
              .trim()
              .min(8, 'Password must be at least 8 characters')
              .max(50, 'Password can be at most 50 characters')
              .required('Password is required.'),
            confirmPassword: yup.string().trim()
              .required('Confirm password is required')
              .oneOf([yup.ref('password'), null], 'Passwords must match')
          }),
          
        onSubmit: (data) => {
            data.secretCode = data.secretCode.trim();
            data.name = data.name.trim();
            data.adminID = data.adminID.trim();
            data.email = data.email.trim();
            data.role = data.role.trim();
            data.password = data.password.trim();
            http.post("/adminuser/register", data)
                .then((res) => {
                    console.log(res.data);
                    navigate("/login");
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
                Register Admin
            </Typography>
            <Box component="form" sx={{ maxWidth: '500px' }} onSubmit={formik.handleSubmit}>
                <TextField
                    fullWidth margin="normal" autoComplete="off"
                    label="Secret Code"
                    name="secretCode"
                    value={formik.values.secretCode}
                    onChange={formik.handleChange}
                    error={formik.touched.secretCode && Boolean(formik.errors.secretCode)}
                    helperText={formik.touched.secretCode && formik.errors.secretCode}
                />
                <TextField
                    fullWidth margin="normal" autoComplete="off"
                    label="Admin ID"
                    name="adminID"
                    value={formik.values.adminID}
                    onChange={formik.handleChange}
                    error={formik.touched.adminID && Boolean(formik.errors.adminID)}
                    helperText={formik.touched.adminID && formik.errors.adminID}
                />
                <TextField
                    fullWidth margin="normal" autoComplete="off"
                    label="Name"
                    name="name"
                    value={formik.values.name}
                    onChange={formik.handleChange}
                    error={formik.touched.name && Boolean(formik.errors.name)}
                    helperText={formik.touched.name && formik.errors.name}
                />
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
                    label="Role"
                    name="role"
                    value={formik.values.role}
                    onChange={formik.handleChange}
                    error={formik.touched.role && Boolean(formik.errors.role)}
                    helperText={formik.touched.role && formik.errors.role}
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
                <TextField
                    fullWidth margin="normal" autoComplete="off"
                    label="Confirm Password"
                    name="confirmPassword" type="password"
                    value={formik.values.confirmPassword}
                    onChange={formik.handleChange}
                    error={formik.touched.confirmPassword && Boolean(formik.errors.confirmPassword)}
                    helperText={formik.touched.confirmPassword && formik.errors.confirmPassword}
                />
                <Button fullWidth variant="contained" sx={{ mt: 2 }}
                    type="submit">
                    Register
                </Button>
                
            </Box>
            <ToastContainer />
        </Box>
    )
}

export default RegisterAdmin