import { TextField, FormControlLabel, Checkbox, Button, Box, Alert } from '@mui/material';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useRegisterUserMutation } from '../../Services/userAuthApi';
import { storeToken } from '../../Services/localStorage';

const Registration = () => {
    const [registerUser, { isLoading, isError }] = useRegisterUserMutation()
    const [userData, setuserData] = useState({
        userHandle: "",
        name: "",
        email: "",
        password: "",
        password_conf: "",
        tc: true

    })
    const [error, setError] = useState({
        status: false,
        msg: "",
        type: ""
    })
    const navigate = useNavigate();

    const handleChange = (e) => {
        const { name, value } = e.target;
        setuserData({
            ...userData,
            [name]: value

        })
    }

    const handleSubmit = async (e) => {
        e.preventDefault();

        const actualData = {
            userHandle: userData.userHandle,
            name: userData.name,
            email: userData.email,
            password: userData.password,
            password_conf: userData.password_conf,
            tc: userData.tc,
        }
        console.log(actualData)
        if (actualData.userHandle && actualData.name && actualData.email && actualData.password && actualData.password_conf && actualData.tc !== null) {
            if (actualData.password === actualData.password_conf) {
                const res = await registerUser(actualData)
                console.log(actualData);
                console.log(res);
                if (res.data.status === "success") {
                    // store token
                    storeToken(res.data.token)
                    navigate(`/dashboard`)
                } else if (res.data.status === "failed_handle") {
                    setError({ status: true, msg: res.data.message, type: 'error' })
                } else if (res.data.status === "failed_email") {
                    setError({ status: true, msg: res.data.message, type: 'error' })
                }
                else {
                    setError({ status: true, msg: res.data.message, type: 'error' })
                }
            } else {
                setError({ status: true, msg: "Password and Confirm Password Doesn't Match", type: 'error' })
            }
        } else {
            setError({ status: true, msg: "All Fields are Required", type: 'error' })
        }
    }
    return <>
        <Box component='form' noValidate sx={{ mt: 1 }} id='registration-form' onSubmit={handleSubmit}>
            <TextField margin='normal' required fullWidth id='userHandle' name='userHandle' label='User Handle'
                value={userData.userHandle} onChange={(e) => { handleChange(e) }} />
            <TextField margin='normal' required fullWidth id='name' name='name' label='Name'
                value={userData.name} onChange={(e) => { handleChange(e) }} />
            <TextField margin='normal' required fullWidth id='email' name='email' label='Email Address'
                value={userData.email} onChange={(e) => { handleChange(e) }} />
            <TextField margin='normal' required fullWidth id='password' name='password' label='Password' type='password'
                value={userData.password} onChange={(e) => { handleChange(e) }} />
            <TextField margin='normal' required fullWidth id='password_conf' name='password_conf' label='Confirm Password' type='password'
                value={userData.password_conf} onChange={(e) => { handleChange(e) }} />
            <FormControlLabel control={<Checkbox value={userData.tc} color="primary" name="tc" id="tc" />} label="I agree to term and condition." />
            <Box textAlign='center'>
                <Button type='submit' variant='contained' sx={{ mt: 3, mb: 2, px: 5, background: "#6d1b7b" }}>Join</Button>
            </Box>
            {error.status ? <Alert severity={error.type}>{error.msg}</Alert> : ''}
        </Box>
    </>;
};

export default Registration;