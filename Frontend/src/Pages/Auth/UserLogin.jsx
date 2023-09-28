import { TextField, Button, Box, Alert } from '@mui/material';
import { useState } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import { useLoginUserMutation } from '../../Services/userAuthApi';
import { storeToken } from '../../Services/localStorage';

const UserLogin = () => {
    const [loginUser, { isLoading, isError }] = useLoginUserMutation();
    const [loginData, setloginData] = useState({
        email: "",
        password: ""
    })
    const [error, setError] = useState({
        status: false,
        msg: "",
        type: ""
    })
    const navigate = useNavigate();

    const handleChange = (e) => {
        //  console.log(e.target.value)
        const { name, value } = e.target;
        setloginData({
            ...loginData,
            [name]: value
        })
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        const actualData = {
            email: loginData.email,
            password: loginData.password,
        }
        console.log(actualData)
        if (actualData.email && actualData.password) {
            const res = await loginUser(actualData)
            console.log(actualData);
            if (res.data.status === 'success') {
                //set token here
                storeToken(res.data.token)
                document.getElementById('login-form').reset()
                setError({ status: true, msg: "Login Success", type: 'success' })
                navigate('/dashboard')
            } else {
                setError({ status: true, msg: res.data.message, type: 'error' })
            }
        } else {
            setError({ status: true, msg: "All Fields are Required", type: 'error' })
        }
    }
    return <>
        <Box component='form' noValidate sx={{ mt: 1 }} id='login-form' onSubmit={handleSubmit}>
            <TextField margin='normal' autoFocus required fullWidth id='email' name='email' label='Email Address'
                value={loginData.email} onChange={(e) => handleChange(e)} />
            <TextField margin='normal' required fullWidth id='password' name='password' label='Password' type='password'
                value={loginData.password} onChange={(e) => handleChange(e)}
            />
            <Box textAlign='center'>
                <Button type='submit' variant='contained' sx={{ mt: 3, mb: 2, px: 5, background: "#6d1b7b" }}>Login</Button>
            </Box>
            <NavLink to='/sendpasswordresetemail' >Forgot Password ?</NavLink>
            {error.status ? <Alert severity={error.type} sx={{ mt: 3 }}>{error.msg}</Alert> : ''}
        </Box>
    </>;
};

export default UserLogin;