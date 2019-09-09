import React,{ useState } from 'react'
import './register.css'
import { withRouter } from 'react-router-dom'
import api from '../config/api'
import Spinner from 'react-spinner-material'
import { Button } from '@material-ui/core'
import Avatar from 'react-avatar'
import Resizer from 'react-image-file-resizer'

const Register = ({history})=>{
    const [ error, setError ] = useState('')
    const [ registerSucess, setRegisterSucess ] = useState()
    const [ name, setName ] = useState('')
    const [ lastName, setLastName ] = useState('')
    const [ email, setEmail ] = useState('')
    const [ phone, setPhone ] = useState('')
    const [ avatar, setAvatar ] = useState('')
    const [ password, setPassword ] = useState('')
    const [ password_Tow, setPassword_Two ] = useState('')
    const [ loading, setLoading ] = useState('')

    async function handleRegister(event){
        event.preventDefault()
        if(!name ||  !email || !phone || !password) return setError('Todos os campos devem ser preenchidos!')
        if( password !== password_Tow) return setError('As senhas não são iguais!')
        if(password.length < 6 ) return setError('Sua senha deve conter no mínimo 6 dígitos')

        try{
            setLoading(true)
            const response = await api.post('/createUser',{
                avatar,
                name,
                lastName,
                email,
                phone,
                password
            })
            .then(()=>{
                setLoading(false)
            })
            //if(response.data.message) return setError('Este E-mail já esta cadastrado!')
            setRegisterSucess('Cadastro realizado com sucesso!')
            handleClear()
        } 
        catch(err){
            console.log(err)
            return setLoading(false)
        }
    }
    function handleClear(){
        document.getElementById('form').reset()
        setError('')
        setName('')
        setEmail('')
        setPhone('')
        setAvatar('')
        setPassword('')
        setPassword_Two('')
    }
    function handleGoBack(){
        history.goBack()
    }
    function handleErro(){
        setTimeout(function(){
            setError('')
        },3000)
        return(
            <div className="logger-error-register">
                <p>{error}</p>
            </div>
        )
    }
    function handleRegisterSucess(){
        setTimeout(function(){
            setRegisterSucess('')
            handleClear()
       },3000)
        return(
            <div className="register-sucess">
                <p>{registerSucess}</p>
            </div>
        )
    }
    function handleAvatar(event){
        Resizer.imageFileResizer(
            event.target.files[0], 300, 400, 'JPEG', 100, 0, uri=>{
                console.log(uri)
                setAvatar(uri)},'base64')
    }
    return(
        <div className="container-register">
            <Avatar name="F"  src={avatar} round={true}/>
            <form id="form" onSubmit={(event)=>handleRegister(event)}>
                <input
                accept="image/*"
                id="contained-button-file"
                type="file"
                className="inputFile"
                onChange={(event)=> handleAvatar(event)}
                />
                <label htmlFor="contained-button-file" className="btn-upload">
                    <Button  variant="contained"  component="span">
                        Upload Image
                    </Button>
                </label>
                <input type="text"
                onChange={(event) => setName(event.target.value)}
                placeholder ="Nome"
                />
                <input type="text"
                onChange={(event) => setLastName(event.target.value)}
                placeholder ="Sobrenome"
                />
                <input type="email"
                onChange={(event) => setEmail(event.target.value)}
                placeholder="E-mail"
                />
                <input type="tel"
                onChange={(event) => setPhone(event.target.value)}
                placeholder="Telefone"
                />
                <input type="password"
                onChange={(event) => setPassword(event.target.value)}
                placeholder="Senha"
                />
                <input type="password"
                onChange={(event) => setPassword_Two(event.target.value)}
                placeholder="Confirmar Senha"
                />
                {error ? handleErro() : <></>}
                {registerSucess ? handleRegisterSucess() : <></>}
                { loading ? 
                <div className="container-spinner">
                    <Spinner size={34} spinnerColor={"rgb(53, 53, 53)"} spinnerWidth={2} visible={loading} />
                </div> 
                :   <> 
                        <button   className="container-register-button">Cadastrar</button>
                        <a  onClick={()=> handleGoBack()} className="container-goBack">voltar</a>
                    </>
                }
            </form>
        </div>
    )
}
export default withRouter(Register)