import { Button } from '@mui/material'
import React from 'react'
import { useNavigate } from 'react-router-dom'

const home = ({token}) => {
    const navigate = useNavigate();
    function handleLogout(){
        sessionStorage.removeItem('token')
        navigate('/')

    }
  return (
    <div>
        Hi {token.user.user_metadata.fullname} !



        <Button onClick={handleLogout}>Logout</Button>
    </div>
  )
}

export default home