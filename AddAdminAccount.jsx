import React from 'react';
import { Box, Typography, TextField, Button } from '@mui/material';
import { useFormik } from 'formik';
import { Link } from 'react-router-dom';
import * as yup from 'yup';
import http from '../http';

function AddAdminAccount() {
    const formik = useFormik({
        initialValues: {
            name: "",
            adminID: "",
            role: "",
        },
        validationSchema: yup.object({
            name: yup
              .string()
              .trim()
              .min(2, 'Name must be at least 2 characters')
              .max(50, 'Name must be at most 50 characters')
              .required('Name is required.'),
            adminID: yup
              .string()
              .trim()
              .matches(/^(\d{6}[A-Z])$/, 'Admin ID should be in the format eg. 111111A')
              .required('Admin ID is required.'),
            role: yup.string().required('Description of role is required.'),
          }),
          
          
        onSubmit: (data) => {
            data.name = data.name.trim();
            data.adminID = data.adminID.trim();
            data.role = data.role.trim();
            http.post("/adminAccount", data)
                .then((res) => {
                    console.log(res.data);
                });
        }
    });


    return (
        <Box>
            <Typography variant="h5" sx={{ my: 2 }}>
                Add Admin Account
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
                    multiline minRows={2}
                    label="Role"
                    name="role"
                    value={formik.values.role}
                    onChange={formik.handleChange}
                    error={formik.touched.role && Boolean(formik.errors.role)}
                    helperText={formik.touched.role && formik.errors.role}
                />
                <Box sx={{ mt: 2 }}>

                    <Button variant="contained" type="submit">
                        Add
                    </Button>
  
                </Box>
            </Box>
        </Box>
    );
}

export default AddAdminAccount;