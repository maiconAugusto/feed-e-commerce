import React ,{  useState, useEffect } from 'react'
import './login.css'
import { Link } from 'react-router-dom'
import api from '../config/api'
import Spinner from 'react-spinner-material'


const Login = ({history})=>{
    const [ error, setError ] = useState('')
    const [ email, setEmail ] = useState('')
    const [ password, setPassword ] = useState('')
    const [ loading, setLoading ] = useState('')

    useEffect(()=>{
        const response = JSON.parse(localStorage.getItem('user'))
            if(response === null){
                return
            }
            if(response.token){
                history.push('/home')
            }
    })

    async function handleLogged(event){
        event.preventDefault()

        if(!email && !password) return setError('Informe seu E-mail e senha!')
        if(!email) return setError('Informe seu E-mail')
        if(!password) return setError('Informe sua senha')
        
        try{
            setLoading(true)
            await api.post('/auth',{
                email,
                password
            })
                .then((response)=>{                
                    localStorage.setItem('user',JSON.stringify(response.data))
                        setLoading(false)
                            history.push(`/home`)
                })
        } catch(err){
            return setLoading(false)
        }
    }
    function handleErro(){
        setTimeout(function(){
            setError('')
       },3000)
        return(
            <div className="logger-error">
                <p>{error}</p>
            </div>
        )
    }
    return(
        <div className="container">
            <div className="ar-c">
                <small id="logo">Desapego.com</small>
                <form onSubmit={handleLogged} className="container-form">
                    <input type="email" 
                    placeholder ="E-mail"
                    value={email}
                    onChange={(event)=>setEmail(event.target.value) }
                    />
                    <input type="password"
                    value={password}
                    placeholder = "Password"
                    onChange={(event)=> setPassword(event.target.value)}
                    />
                    {error ? handleErro() : <></>}
                    { loading ? 
                    <div className="container-spinner">
                        <Spinner size={34} spinnerColor={"rgb(53, 53, 53)"} spinnerWidth={2} visible={loading} />
                    </div> 
                    : <button>Login</button>
                    }
                </form>
                <Link  to="/register" className="container-new-register-user">Não tem cadastro? Cadastre-se.</Link>
            </div>
        </div>
    )
}
export default Login