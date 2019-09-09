import React, { useState } from  'react'
import Resizer from 'react-image-file-resizer'
import api from '../config/api'
import postDate from '../config/date'


const Post = (props)=>{
    const [ title, setTitle ] = useState('')
    const [ description, setDescription ] = useState('')
    const [ condition, setCondition ] = useState('')
    const [ image, setImage ] = useState('')


    function handleImageChange(product){
        Resizer.imageFileResizer(
            product.target.files[0], 300, 400, 'JPEG', 100, 0, uri=>{
                setImage(uri)},'base64')
    }
    async function handleCreatePost(event){
        event.preventDefault()
            await api.post('/add',{
                title,
                description,
                condition,
                image,
                postDate
                })
            document.getElementById('form').reset()

    }
    return(
            <div className="container-post">
                <form id="form" onSubmit={handleCreatePost}>
                    <input type="text"
                    maxLength={40} 
                    onChange={(event)=> setTitle(event.target.value)}
                    placeholder = "Produto"
                    />
                    <input type="text"
                    maxLength={40}
                    onChange={(event)=> setDescription(event.target.value)}
                    placeholder ="Descrição"
                    />
                    <div className="container-post-checkBox">
                        <strong>Condição:</strong>
                        <input 
                        name="type"
                        type="radio"
                        value={condition}
                        onChange={(()=> setCondition('Excelente'))}
                            />
                        <small>Exelente</small>

                        <input 
                        type="radio" 
                        name="type"
                        value={condition}
                        onChange={(()=> setCondition('Ótimo'))}
                        />
                        <small>Ótimo</small>

                        <input 
                        type="radio" 
                        name="type"
                        value={condition}
                        onChange={(()=> setCondition('Bom'))}
                        />
                        <small>Bom</small>
                    </div> 
                    <div className="container-post-btn">
                        <input 
                        id="file"
                        type="file"
                        onChange={(product)=> handleImageChange(product)}/>
                        <label id="upload" htmlFor="file">
                            <small>Upload</small>
                        </label>
                    <button id="btn-submit">Publicar</button>
                    </div>
                </form>
            </div>
    )
}

export default Post