import { Box, TextField, Button, Alert, } from '@mui/material';
import { useState } from 'react';
import { useChangePasswordWhileLoginedMutation } from '../../Services/userAuthApi';
import { getToken } from '../../Services/localStorage';

const ChangePassword = () => {
    const token = getToken()
    const [changePasswordWhileLogined, { isLoading, isSuccess, isError }] = useChangePasswordWhileLoginedMutation()
    const [userData, setuserData] = useState({
        password: "",
        password_conf: ""
    })
    const [error, setError] = useState({
        status: false,
        msg: "",
        type: ""
    });
    const handleChange = (e) => {
        const { name, value } = e.target;
        setuserData({
            ...userData,
            [name]: value
        })
    }
    const handleSubmit = async (event) => {
        event.preventDefault();
        const actualData = {
            password: userData.password,
            password_conf: userData.password_conf,
        }
        if (actualData.password && actualData.password_conf) {
            if (actualData.password === actualData.password_conf) {
                console.log(actualData);
                const res = await changePasswordWhileLogined({ actualData, token })
                if (res.data.status === 'success') {
                    document.getElementById("password-change-form").reset();
                    setError({ status: true, msg: res.data.message, type: "success" });
                } else {
                    setError({ status: true, msg: res.data.message, type: "error" })
                }
            } else {
                setError({ status: true, msg: "Password and Confirm Password Doesn't Match", type: "error" })
            }
        } else {
            setError({ status: true, msg: "All Fields are Required", type: "error" })
        }
    };
    return <>
        <Box sx={{ display: 'flex', flexDirection: 'column', flexWrap: 'wrap', maxWidth: 600, mx: 4 }}>
            <h1>Change Password</h1>
            <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1 }} id="password-change-form">
                <TextField margin="normal" required fullWidth name="password" label="New Password" type="password" id="password"
                    value={userData.password} onChange={(e) => handleChange(e)} />
                <TextField margin="normal" required fullWidth name="password_conf" label="Confirm New Password" type="password" id="password_conf"
                    value={userData.password_conf} onChange={(e) => handleChange(e)} />
                <Box textAlign='center'>
                    <Button type="submit" variant="contained" sx={{ mt: 3, mb: 2, px: 5 }}> Update </Button>
                </Box>
                {error.status ? <Alert severity={error.type}>{error.msg}</Alert> : ""}
            </Box>
        </Box>
    </>;
};

export default ChangePassword;