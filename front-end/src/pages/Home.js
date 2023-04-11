import React from 'react'
import {Link} from 'react-router-dom'

export default function Home(){
    return(
        <>
            <h1> Pagina Inicial</h1>
            <p>Ir para a <Link to="/login">pagina de login</Link>.</p>
        </>
    )
}