import { Grid, TextField, Button, Box, Alert } from "@mui/material";
import { useState } from 'react';
import { useSendPasswordResetEmailMutation } from "../../Services/userAuthApi";
import CircularProgress from '@mui/material/CircularProgress';

const SendPasswordResetEmail = () => {
  const [sendPasswordResetEmail, { isLoading, isError }] = useSendPasswordResetEmailMutation()

  const [email, setemail] = useState("")
  const [error, setError] = useState({
    status: false,
    msg: "",
    type: ""
  })
  const handleSubmit = async (e) => {
    e.preventDefault();
    const actualData = {
      email: email
    }
    console.log(actualData)
    if (actualData.email) {
      const res = await sendPasswordResetEmail(actualData)
      console.log(res)
      if (res.data.status === "success") {
        document.getElementById('password-reset-email-form').reset()
        setError({ status: true, msg: res.data.message, type: 'success' })
      } else {
        setError({ status: true, msg: res.data.message, type: 'error' })
      }
      console.log(actualData);
    } else {
      setError({ status: true, msg: "Please Provide Valid Email", type: 'error' })
    }
  }
  return <>
    <Grid container justifyContent='center'>
      <Grid item sm={6} xs={12}>
        <h1>Reset Password</h1>
        <Box component='form' noValidate sx={{ mt: 1 }} id='password-reset-email-form' onSubmit={handleSubmit}>
          <TextField margin='normal' required fullWidth id='email' name='email' label='Email Address'
            value={email} onChange={(e) => setemail(e.target.value)} />
          <Box textAlign='center'>
            {
              isLoading ? <CircularProgress /> :
                <Button type='submit' variant='contained' sx={{ mt: 3, mb: 2, px: 5 }}>Send</Button>
            }
          </Box>
          {error.status ? <Alert severity={error.type}>{error.msg}</Alert> : ''}
        </Box>
      </Grid>
    </Grid>
  </>;
};

export default SendPasswordResetEmail;