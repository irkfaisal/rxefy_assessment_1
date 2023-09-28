import { Button } from '@mui/material';
import React from 'react'
import LoginIcon from '@mui/icons-material/Login';
import { useNavigate } from 'react-router-dom';

const Home = () => {
  const navigate = useNavigate()
  return (
    <>
      <div style={{ minHeight: "100vh", display: "flex", justifyContent: "center", }}>
        <div className='notLoggedIn' style={{ width: "300px", height: "150px", borderRadius: "10px", background: "#fff", marginTop: "2rem", }}>
          <h1 style={{ textAlign: "center" }}>You are not login!</h1>
          <div style={{ marginLeft: "2rem" }} onClick={() => navigate(`/login`)}>
            <Button variant="contained" endIcon={<LoginIcon />}>Login</Button>
          </div>
        </div>
      </div>
    </>
  )
}

export default Home;