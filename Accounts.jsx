import React, { useEffect, useState } from 'react';
import { Box, Typography, Grid, Card, CardContent, Input, IconButton, Button }
    from '@mui/material';
import { AccessTime, Search, Clear } from '@mui/icons-material';
import { Link } from 'react-router-dom';
import dayjs from 'dayjs';
import global from '../global';
import http from '../http';

function Accounts() {
    const [userList, setUserList] = useState([]);
    const [search, setSearch] = useState('');
    const onSearchChange = (e) => {
        setSearch(e.target.value);
    };

    const getUsers = () => {
        http.get('/user').then((res) => {
            setUserList(res.data);
        });
    };

    const searchUsers = () => {
        http.get(`/user?search=${search}`).then((res) => {
            setUserList(res.data);
        });
    };

    useEffect(() => {
        getUsers();
    }, []);

    const onSearchKeyDown = (e) => {
        if (e.key === "Enter") {
            searchUsers();
        }
    };

    const onClickSearch = () => {
        searchUsers();
    }
    const onClickClear = () => {
        setSearch('');
        getUsers();
    };

    useEffect(() => {
        http.get('/user').then((res) => {
            console.log(res.data);
            setUserList(res.data);
        });
    }, []);

    return (
        <Box>
            <Typography variant="h5" sx={{ my: 2 }}>
                Accounts
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

            </Box>
            <Grid container spacing={2}>
                {
                    userList.map((user, i) => {
                        return (
                            <Grid item xs={12} md={6} lg={4} key={user.id}>
                                <Card>
                                    <CardContent>
                                        <Typography variant="h6" sx={{ mb: 1 }}>
                                            {user.firstName} {user.lastName}
                                        </Typography>
                                        <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}
                                            color="text.secondary">

                                            <AccessTime sx={{ mr: 1 }} />
                                            <Typography>
                                                {dayjs(user.createdAt).format(global.datetimeFormat)}
                                            </Typography>

                                        </Box>
                                        <Typography sx={{ whiteSpace: 'pre-wrap' }}>
                                            {user.email}
                                        </Typography>
                                        <Typography sx={{ whiteSpace: 'pre-wrap' }}>
                                            {user.phoneNo}
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

export default Accounts