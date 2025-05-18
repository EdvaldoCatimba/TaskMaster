import { useAuth } from "../context/AuthContext";
import { useNavigate } from 'react-router-dom';
import { useEffect } from "react";
import React from 'react'

export default function 
() {

    const { user, logout } = useAuth();
    const navigate = useNavigate();

    useEffect(()=>{
        setInterval(()=>{
            navigate('/')
        },5000)
    })

  return (
    <div>
        <p>Precisas estar logado para acessar o dashboard</p>
    </div>
  )
}
