import React, { useEffect } from 'react'
import { Button } from '@mui/material';
import LoginIcon from '@mui/icons-material/Login';
import { useNavigate } from 'react-router-dom';
import { getToken } from '../Services/localStorage';
import WorkDiv from '../components/WorkDiv';
import { useGetAllWorkCardQuery } from '../Services/userAuthApi';

const Home = () => {
  const navigate = useNavigate()
  const token = getToken()
  const { data } = useGetAllWorkCardQuery(token)
  // console.log(data)

  return (
    <>
      <div style={{ minHeight: "100vh", display: "flex", justifyContent: "center", alignItems: "center", flexDirection: "column" }}>
        {
          token ?
            (
              <>
                <h1>All work</h1>
                <WorkDiv data={data} />
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
      </div>
    </>
  )
}

export default Home;