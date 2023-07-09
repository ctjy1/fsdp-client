import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Box, Typography, TextField, Button } from '@mui/material';
import { Dialog, DialogTitle, DialogContent, DialogContentText, DialogActions } from '@mui/material';
import http from '../http';
import { useFormik } from 'formik';
import * as yup from 'yup';

function EditAdminAccount() {
    const { id } = useParams();
    const navigate = useNavigate();

    const [adminaccount, setAdminAccount] = useState({
        name: "",
        adminID: "",
        email:"",
        role: ""
    });

    useEffect(() => {
        http.get(`/adminaccount/${id}`).then((res) => {
            setAdminAccount(res.data);
        });
    }, []);

    const formik = useFormik({
        initialValues: adminaccount,
        enableReinitialize: true,
        validationSchema: yup.object().shape({
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
          role: yup.string().required('Description of role is required.')
        }),
        onSubmit: (data) => {
            data.secretCode = data.secretCode.trim();
            data.name = data.name.trim();
            data.adminID = data.adminID.trim();
            data.email = data.email.trim();
            data.role = data.role.trim();
            http.put(`/adminaccount/${id}`, data)
                .then((res) => {
                    console.log(res.data);
                    navigate("/adminaccount");
                });
        }
    });

    const [open, setOpen] = useState(false);

    const handleOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    const deleteAdminAccount = () => {
        http.delete(`/adminaccount/${id}`)
            .then((res) => {
                console.log(res.data);
                navigate("/adminaccount");
            });
    }

    return (
        <Box>
            <Typography variant="h5" sx={{ my: 2 }}>
                Edit Admin Account
            </Typography>
            <Box component="form" onSubmit={formik.handleSubmit}>
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
                <Box sx={{ mt: 2 }}>
                    <Button variant="contained" type="submit">
                        Update
                    </Button>
                    <Button variant="contained" sx={{ ml: 2 }} color="error"
                        onClick={handleOpen}>
                        Delete
                    </Button>
                </Box>
            </Box>

            <Dialog open={open} onClose={handleClose}>
                <DialogTitle>
                    Delete Admin Account
                </DialogTitle>
                <DialogContent>
                    <DialogContentText>
                        Are you sure you want to delete this admin account?
                    </DialogContentText>
                </DialogContent>
                <DialogActions>
                    <Button variant="contained" color="inherit"
                        onClick={handleClose}>
                        Cancel
                    </Button>
                    <Button variant="contained" color="error"
                        onClick={deleteAdminAccount}>
                        Delete
                    </Button>
                </DialogActions>
            </Dialog>
        </Box>
    );
}

export default EditAdminAccount;