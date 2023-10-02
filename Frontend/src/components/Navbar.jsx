import React from 'react'
import { AppBar, Box, Toolbar, Typography, Button } from '@mui/material';
import { NavLink } from 'react-router-dom';
import { getToken } from '../Services/localStorage';

const Navbar = () => {
    const token = getToken('token')
    return (
        <>
            <Box sx={{ flexGrow: 1 }}>
                <AppBar position="static" sx={{ background: "#F34C19" }}>
                    <Toolbar>
                        <Typography variant='h5' component="div" sx={{ flexGrow: 1, }}>Rxefy Assessment</Typography>

                        <Button component={NavLink} to='/' style={({ isActive }) => { return { backgroundColor: isActive ? '#6d1b7b' : '' } }} sx={{ color: 'white', textTransform: 'none' }}>Home</Button>

                        <Button component={NavLink} to='/work' style={({ isActive }) => { return { backgroundColor: isActive ? '#6d1b7b' : '' } }} sx={{ color: 'white', textTransform: 'none' }}>Create Work</Button>
                        {
                            token ? <Button component={NavLink} to='/dashboard' style={({ isActive }) => { return { backgroundColor: isActive ? '#6d1b7b' : '' } }} sx={{ color: 'white', textTransform: 'none' }}>Dashboard</Button>
                                :
                                <Button component={NavLink} to='/login' style={({ isActive }) => { return { backgroundColor: isActive ? '#6d1b7b' : '' } }} sx={{ color: 'white', textTransform: 'none' }}>Login /  Registration</Button>
                        }
                    </Toolbar>
                </AppBar>
            </Box>
        </>
    )
}

export default Navbar