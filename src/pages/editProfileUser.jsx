import React, { useState, useEffect } from 'react'
import { withRouter } from 'react-router-dom'
import './editProfileUser.css'
import Fab from '@material-ui/core/Fab'
import { Button } from '@material-ui/core'
import { ArrowBack } from '@material-ui/icons';
import Avatar from 'react-avatar'
import api from '../config/api'
import Resizer from 'react-image-file-resizer'
import Spinner from 'react-spinner-material'

const EditProfileUser = ({match, history})=>{
    const [ avatar, setAvatar ] = useState('')
    const [ name, setName ] = useState('')
    const [ lastName, setLastName ] = useState('')
    const [ email, setEmail ] = useState('')
    const [ phone, setPhone ] = useState('')
    const [ loading, setLoading ] = useState('')
    const [ error, setError ] = useState('')

    async function handleEditProfile( evenet){
        evenet.preventDefault()
        if(!name || ! lastName || !email || !phone) return setError('Todos os campos devem ser preenchidos')
        try{
            setLoading(true)
            const response = await api.put(`/edit/profile/${match.params.id}`,{
                avatar,
                name,
                lastName,
                email,
                phone
            }).then((response)=>{
                setLoading(false)
            }).catch((err)=>{
                setLoading(false)
            })
        }
        catch(err){
            setLoading(false)
        }
    }
    function handleAvatar(event){
        Resizer.imageFileResizer(
            event.target.files[0], 300, 400, 'JPEG', 100, 0, uri=>{
                console.log(uri)
                setAvatar(uri)},'base64')
    }
    function handleErro(){
        setTimeout(function(){
            setError('')
        },3000)
        return(
            <div className="logger-error-edit">
                <p>{error}</p>
            </div>
        )
    }

    return(
        <div className="container-edit-p">
            <div className="container-edit-prodile-header">
                <header>
                    <nav>
                        <Fab size='small' onClick={()=> history.goBack() }>
                            <ArrowBack  color='secondary'/>
                        </Fab>
                    </nav>
                </header>
            </div>
            <div className="container-edit-profile-edit">
                <Avatar name="F"  src={avatar} round={true}/>
                    <form onSubmit={(event)=> handleEditProfile(event)}>
                        <input 
                        accept="image/*"
                        type="file"
                        id="contained-button-file"
                        className="input-file-image"
                        onChange={(event)=> handleAvatar(event)}
                        />
                        <label htmlFor="contained-button-file" className="btn-upload">
                            <Button  variant="contained"  component="span">
                                Upload Image
                            </Button>
                        </label>
                        <input type="text"
                        placeholder="Nome"
                        onChange={(event)=> setName(event)}
                        />
                        <input type="text"
                        placeholder="Sobrenome"
                        onChange={(event)=> setLastName(event)}
                        />
                        <input type="text"
                        placeholder="E-mail"
                        onChange={(event)=> setEmail(event)}
                        />
                        <input type="tel"
                        placeholder="Telefone"
                        onChange={(event)=> setPhone(event)}
                        />
                        {error? handleErro(): <> </>}
                        {loading ? 
                        <div className="container-spinner-edit">
                            <Spinner size={34} spinnerColor={"rgb(53, 53, 53)"} spinnerWidth={2} visible={loading} />
                        </div> 
                        :
                        <button className="container-register-button">Salvar</button>
                        }
                    </form>
            </div>
        </div>
    )
}
export default withRouter(EditProfileUser)
