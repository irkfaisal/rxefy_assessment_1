import Home from './Pages/Home'
import Layout from './Pages/Layout'
import CreateWork from './Pages/CreateWork'
import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom'
import LoginReg from './Pages/Auth/LoginReg'
import ResetPassword from './Pages/Auth/ResetPassword'
import SendResetPasswordEmail from './Pages/Auth/SendPasswordResetEmail'
import Dashboard from './Pages/Dashboard'
import { getToken } from './Services/localStorage'
function App() {

  const token = getToken()

  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path='/' element={<Layout />}>
            <Route index element={<Home />} />
            <Route path='/work' element={<CreateWork />} />
            <Route path="login" element={!token ? <LoginReg /> : <Navigate to="/dashboard" />} />
            <Route path="/sendpasswordresetemail" element={<SendResetPasswordEmail />} />
            <Route path="api/user/resetpassword/:id/:token" element={<ResetPassword />} />
          </Route>
          <Route path="/dashboard" element={token ? <Dashboard /> : <Navigate to="/login" />} />
          <Route path="*" element={<h1>Error 404 Page not found !!</h1>} />
        </Routes>
      </BrowserRouter>
    </>
  )
}

export default App
