import { Button, CssBaseline, Grid, Typography } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import ChangePassword from './Auth/ChangePassword';
import { getToken, removeToken } from '../Services/localStorage';
import { useGetLoggedUserDataQuery } from '../Services/userAuthApi';

const Dashboard = () => {
    const token = getToken()
    const { data, isSuccess } = useGetLoggedUserDataQuery(token)
    console.log(data)
    const navigate = useNavigate()
    const handleLogout = () => {
        console.log("Logout Clicked");
        removeToken('token')
        navigate('/login')
    }
    return <>
        <CssBaseline />
        <Grid container>
            <Grid item sm={4} sx={{ backgroundColor: 'gray', p: 5, color: 'white' }}>
                <h1>Dashboard</h1>
                <Typography variant='h6'>User Handle:{`@${data?.user?.userHandle}`}</Typography>
                <Typography variant='h5'>Email: {data?.user?.email} </Typography>
                <Typography variant='h6'>Name:{data?.user?.name}</Typography>
                <Button variant='contained' color='warning' size='large' onClick={handleLogout} sx={{ mt: 8 }}>Logout</Button>
            </Grid>
            <Grid item sm={8}>
                <ChangePassword />
            </Grid>
        </Grid>
    </>;
};

export default Dashboard;