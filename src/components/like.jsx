import React from 'react'
import Fab from '@material-ui/core/Fab'
import { Favorite } from '@material-ui/icons';
import './like.css'
import api from '../config/api'

const Like = (props)=>{
    async function handleLike(_id){
        try{
            const response = await api.post(`/like/${_id}`)
        }
        catch(err){
            
        }
    }
    return(
        <Fab size="small" onClick={() => handleLike(props._id)}>
            <Favorite color="secondary"/>
        </Fab>
    )
}

export default Like