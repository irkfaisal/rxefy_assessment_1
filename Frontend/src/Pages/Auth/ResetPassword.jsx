import { Grid, TextField, Button, Box, Alert } from "@mui/material";
import { useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useResetPasswordMutation } from "../../Services/userAuthApi";

const ResetPassword = () => {
    const [resetPassword, { isLoading, isError }] = useResetPasswordMutation()
    const {id, token} = useParams()
    const [data, setdata] = useState({
        password: "",
        password_conf: ""
    })
    const navigate = useNavigate()
    const [error, setError] = useState({
        status: false,
        msg: "",
        type: ""
    })

    const handleChange = (e) => {
        const { name, value } = e.target;
        setdata({
            ...data,
            [name]: value
        })
    }
    const handleSubmit = async(e) => {
        e.preventDefault();
        const actualData = {
            password: data.password,
            password_conf: data.password_conf,
        }
        console.log(actualData);
        if (actualData.password && actualData.password_conf) {
            if (actualData.password === actualData.password_conf) {
                const res = await resetPassword({ actualData, id, token })
                console.log(actualData);
                if (res.data.status === 'success') {
                    document.getElementById('password-reset-form').reset()
                    setError({ status: true, msg: res.data.message, type: 'success' })
                    setTimeout(() => {
                        navigate("/login")
                    }, 3000)
                } else {
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
        <Grid container justifyContent='center'>
            <Grid item sm={6} xs={12}>
                <h1>Reset Password</h1>
                <Box component='form' noValidate sx={{ mt: 1 }} id='password-reset-form' onSubmit={handleSubmit}>
                    <TextField margin='normal' required fullWidth id='password' name='password' label='New Password' type='password'
                        value={data.password} onChange={(e) => { handleChange(e) }} />
                    <TextField margin='normal' required fullWidth id='password_conf' name='password_conf' label='Confirm New Password' type='password'
                        value={data.password_conf} onChange={(e) => { handleChange(e) }} />
                    <Box textAlign='center'>
                        <Button type='submit' variant='contained' sx={{ mt: 3, mb: 2, px: 5 }}>Save</Button>
                    </Box>
                    {error.status ? <Alert severity={error.type}>{error.msg}</Alert> : ''}
                </Box>
            </Grid>
        </Grid>
    </>;
};

export default ResetPassword;