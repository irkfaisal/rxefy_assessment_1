import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { getToken } from '../Services/localStorage'
import { TextField, Button, Box, Alert } from '@mui/material'
import LoginIcon from '@mui/icons-material/Login';
import { useAddworkMutation } from '../Services/userAuthApi';


const CreateWork = () => {
  const [workData, setWorkData] = useState({
    workId: "",
    title: "",
    work: "",
    assignedTo: "",
  })
  const [error, setError] = useState({
    status: false,
    msg: "",
    type: ""
  })
  const [addWork, { isLoading, IsError }] = useAddworkMutation()
  const navigate = useNavigate()
  const token = getToken()

  const handleChange = (e) => {
    const { name, value } = e.target;
    setWorkData({
      ...workData,
      [name]: value
    })
  }
  const handleSubmit = (e) => {
    e.preventDefault();
    if (workData.workId && workData.title && workData.work && workData.assignedTo) {
      const res = addWork({ workData, token })
        .then((response) => {
          if (response?.data?.status === 'success') {
            document.getElementById('login-form').reset()
            setError({ status: true, msg: response?.data?.message, type: 'success' })
            setTimeout(() => {
              navigate('/')
            }, 1500);
          } else {
            setError({ status: true, msg: response?.data?.message, type: 'error' })
          }
        })
        .catch((error) => {
          console.error('Error:', error);
        });
    } else {
      setError({ status: true, msg: "All Fields are Required or wrong user handle ", type: 'error' })
    }
  }

  return (
    <>
      <div style={{ minHeight: "100vh", display: "flex", justifyContent: "center", }}>
        {
          token ?
            (
              <>
                <div style={{ background: "#fff", padding:"1rem" }} >
                  <h1>Add form</h1>
                  <Box component='form' onSubmit={handleSubmit} noValidate sx={{ mt: 1 }} id='login-form'>
                    <TextField margin='normal' required id='workId' name='workId' label='work Id' value={workData.workId} onChange={(e) => handleChange(e)} />
                    <TextField margin='normal' autoFocus fullWidth required id='title' name='title' label='title' value={workData.title} onChange={(e) => handleChange(e)} />
                    <TextField margin='normal' required fullWidth id='work' name='work' label='work' value={workData.work} onChange={(e) => handleChange(e)} />
                    <TextField margin='normal' required fullWidth id='assignedTo' name='assignedTo' label='Enter user handle' value={workData.assignedTo} onChange={(e) => handleChange(e)} />
                    <Box textAlign='center'>
                      <Button type='submit' variant='contained' sx={{ mt: 3, mb: 2, px: 5, background: "#6d1b7b" }}>Create Work</Button>
                    </Box>
                    {error.status ? <Alert severity={error.type} sx={{ mt: 3 }}>{error.msg}</Alert> : ''}
                  </Box>
                </div>
              </>
            ) :
            (
              <div className='notLoggedIn' style={{ width: "300px", height: "150px", borderRadius: "10px", background: "#fff", marginTop: "2rem", }}>
                <h1 style={{ textAlign: "center" }}>You are not login!</h1>
                <div style={{ marginLeft: "2rem" }} onClick={() => navigate(`/login`)}>
                  <Button sx={{ px: 5, background: "#6d1b7b" }} variant="contained" endIcon={<LoginIcon />}>Login</Button>
                </div>
              </div>
            )
        }
      </div >
    </>
  )
}

export default CreateWork