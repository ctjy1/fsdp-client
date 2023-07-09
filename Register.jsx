import React from 'react'
import { Box, Typography, TextField, Button } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { useFormik } from 'formik';
import * as yup from 'yup';
import http from '../http';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
const phoneRegExp = /^(\+65[ \-]*)?[689]\d{7}$/;

function Register() {
    const navigate = useNavigate();
    const formik = useFormik({
        initialValues: {
            firstName: "",
            lastName: "",
            email: "",
            phoneNo: "",
            password: "",
            confirmPassword: ""
        },
        validationSchema: yup.object({
            firstName: yup
                .string()
                .trim()
                .min(2, 'First name must be at least 2 characters')
                .max(50, 'First name can be at most 50 characters')
                .required('First name is required.'),
            lastName: yup
                .string()
                .trim()
                .min(2, 'Last name must be at least 2 characters')
                .max(50, 'Last name can be at most 50 characters')
                .required('Last name is required.'),
            email: yup
                .string()
                .email('Invalid email address')
                .required('Email is required.'),
            phoneNo: yup
                .string()
                .matches(phoneRegExp, 'Phone number is not valid')
                .required('Phone number is required.'),
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
            data.firstName = data.firstName.trim();
            data.lastName = data.lastName.trim();
            data.phoneNo = data.phoneNo.trim();
            data.email = data.email.trim().toLowerCase();
            data.password = data.password.trim();
            http.post("/user/register", data)
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
                Register
            </Typography>
            <Box component="form" sx={{ maxWidth: '500px' }} onSubmit={formik.handleSubmit}>
                <TextField
                    fullWidth margin="normal" autoComplete="off"
                    label="First Name"
                    name="firstName"
                    value={formik.values.firstName}
                    onChange={formik.handleChange}
                    error={formik.touched.firstName && Boolean(formik.errors.firstName)}
                    helperText={formik.touched.firstName && formik.errors.firstName}

                />
                <TextField
                    fullWidth margin="normal" autoComplete="off"
                    label="Last Name"
                    name="lastName"
                    value={formik.values.lastName}
                    onChange={formik.handleChange}
                    error={formik.touched.lastName && Boolean(formik.errors.lastName)}
                    helperText={formik.touched.lastName && formik.errors.lastName}

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
                    label="Mobile Number"
                    name="phoneNo"
                    value={formik.values.phoneNo}
                    onChange={formik.handleChange}
                    error={formik.touched.phoneNo && Boolean(formik.errors.phoneNo)}
                    helperText={formik.touched.phoneNo && formik.errors.phoneNo}
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

export default Register