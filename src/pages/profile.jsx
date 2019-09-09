import React, { useState, useEffect } from 'react'
import api from '../config/api'
import './profile.css'
import { BallClipRotateMultiple } from 'react-pure-loaders'

const Profile = ({match,props})=>{
    const [ profile, setProfile ] = useState([])
    const [ products, setProducts ] = useState([])
    const [ spinner, setSpinner ]= useState('')

    useEffect(()=>{ 
        setSpinner(true)
        async function handleProfile(){
            const response =  await api.get(`/profile/${match.params.id}`)
                setSpinner(false)
                setProfile(response.data)
        }
        handleProfile()
    })
    useEffect(()=>{
        setSpinner(true)
        async function handlePostProfile(){
            const response = await api.get(`/posts/${match.params.id}`)
            setSpinner(false)
            setProducts(response.data)
        }
        handlePostProfile()
    })

    return(
        <div className="container-profiles">
            <header>
                <section className="profile">
                    { profile.length ===0 ?<BallClipRotateMultiple color={"white"} loading={spinner}/>
                    :
                        <>
                            <img src={profile.avatar} alt="Avatar-User"/>
                            <strong className="font">{profile.name} {profile.lastName}</strong>
                            <small className="font">{profile.email}</small>
                            <small className="font">{profile.phone}</small>
                        </>
                    }
                </section>
            </header>
            <section className="container-profile-post-products">
                {products.length === 0? <div className="loading">
                                            <BallClipRotateMultiple color={"black"} loading={spinner}/>
                                        </div>:
                    products.map((element)=>{
                    return(
                        <div key={element._id} className="post-profile">
                            <img src={element.image} alt={element.description}/>
                            <strong>{element.title}</strong>
                        </div>
                    )
                })}
            </section>
        </div>
    )
}
export default Profile