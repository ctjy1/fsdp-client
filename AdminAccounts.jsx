import React, { useEffect, useState } from 'react';
import { Box, Typography, Grid, Card, CardContent, Input, IconButton, Button } from '@mui/material';
import { AccessTime, Search, Clear, Edit } from '@mui/icons-material';
import { Link } from 'react-router-dom';
import dayjs from 'dayjs';
import global from '../global';
import http from '../http';

function AdminAccounts() {
    const [adminuserList, setAdminUserList] = useState([]);
    const [search, setSearch] = useState('');
    const onSearchChange = (e) => {
        setSearch(e.target.value);
    };

    const getAdminAccounts = () => {
        http.get('/adminuser').then((res) => {
            setAdminUserList(res.data);
        });
    };

    const searchAdminAccounts = () => {
        http.get(`/adminuser?search=${search}`).then((res) => {
            setAdminUserList(res.data);
        });
    };

    useEffect(() => {
        getAdminAccounts();
    }, []);

    const onSearchKeyDown = (e) => {
        if (e.key === "Enter") {
            searchAdminAccounts();
        }
    };

    const onClickSearch = () => {
        searchAdminAccounts();
    }
    const onClickClear = () => {
        setSearch('');
        getAdminAccounts();
    };

    useEffect(() => {
        http.get('/adminaccount').then((res) => {
            console.log(res.data);
            setAdminUserList(res.data);
        });
    }, []);

    return (
        <Box>
            <Typography variant="h5" sx={{ my: 2 }}>
                Admin Accounts
            </Typography>
            <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                <Input value={search} placeholder="Search"
                    onChange={onSearchChange}
                    onKeyDown={onSearchKeyDown} />

                <IconButton color="primary"
                    onClick={onClickSearch}>
                    <Search />
                </IconButton>
                <IconButton color="primary"
                    onClick={onClickClear}>

                    <Clear />
                </IconButton>
                <Box sx={{ flexGrow: 1 }} />
                <Link to="/registerAdmin" style={{ textDecoration: 'none' }}>
                    <Button variant='contained' Link>
                        Add
                    </Button>
                </Link>
            </Box>
            <Grid container spacing={2}>
                {
                    adminuserList.map((adminaccount, i) => {
                        return (
                            <Grid item xs={12} md={6} lg={4} key={adminaccount.id}>
                                <Card>
                                    <CardContent>
                                        <Box sx={{ display: 'flex', mb: 1 }}>
                                            <Typography variant="h6" sx={{ flexGrow: 1 }}>
                                                {adminaccount.adminID}
                                            </Typography>
                                            <Link to={`/editadminaccount/${adminaccount.id}`}>
                                                <IconButton color="primary" sx={{ padding: '4px' }}>
                                                    <Edit />
                                                </IconButton>
                                            </Link>
                                        </Box>
                                        <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}
                                            color="text.secondary">

                                            <AccessTime sx={{ mr: 1 }} />
                                            <Typography>
                                                {dayjs(adminaccount.createdAt).format(global.datetimeFormat)}
                                            </Typography>

                                        </Box>
                                        <Typography sx={{ whiteSpace: 'pre-wrap' }}>
                                            {adminaccount.name}
                                        </Typography>
                                        <Typography sx={{ whiteSpace: 'pre-wrap' }}>
                                            {adminaccount.email}
                                        </Typography>
                                        
                                        <Typography sx={{ whiteSpace: 'pre-wrap' }}>
                                            {adminaccount.role}
                                        </Typography>
                                    </CardContent>
                                </Card>
                            </Grid>
                        );
                    })
                }
            </Grid>
        </Box>
    )
}

export default AdminAccounts