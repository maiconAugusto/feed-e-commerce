import React, { useEffect, useState, Fragment } from 'react'
import './home.css'
import { Favorite } from '@material-ui/icons';
import Post from '../components/post';
import api from '../config/api'
import User from '../components/user';
import Headers from '../components/headers'
import Event from '../components/events'
import Like from '../components/like';
import Avatar from 'react-avatar'
import { BallClipRotateMultiple } from 'react-pure-loaders';

const Home = (props)=>{
    
    const [ product, setProduct ] = useState([])
    const [ user, setUser ] = useState('') 
    const [ spinner, setSpinner ]= useState('')

    useEffect(()=>{
        const response = JSON.parse(localStorage.getItem('user'))
        setUser(response.user)
    },[])

    useEffect(()=>{
        setSpinner(true)
       async function getData(){
                const response = await api.get('/')
                setSpinner(false)
                    setProduct(response.data.docs)}
                        getData()
    },[product])
    function handleProdile(_id){
        console.log(_id)
        props.history.push(`profile/${_id}`)
    }
    return(
        <Fragment>
            <Headers avatar={user.avatar} name={user.name} />
                <section className="container-main container-section">
                    <div className="item">
                        <User user={user}
                        />
                    </div>
                        <div className="item " id="temp">
                            <Post/>
                                {product.length === 0 ? 
                                    <div className ="loading">
                                        <BallClipRotateMultiple color={"black"} loading={spinner}/>
                                    </div> : 
                                    product.map((element)=>{
                                        return(
                                            <div key={element._id} className="post">
                                                <div className="post-ar">
                                                    <img className="avatar" src={element.photo} alt=""/>
                                                    <strong>{element.name}</strong>
                                                </div>
                                                <div className="post-profile-post">
                                                    <a onClick={()=> handleProdile(element.author._id)}>
                                                        <Avatar src={element.author.avatar} className="post-profile-post-avatar" size={40}/>
                                                    </a>
                                                    <div className="post-date">
                                                        <small>{element.author.name}</small>
                                                        <data>{element.postDate}</data>
                                                    </div>
                                                </div>
                                                <small>{element.title}</small>
                                                <img  className="image-product" src={element.image} alt=""/>
                                                <small>{element.description}</small>
                                                <div className="post-like">
                                                    <Favorite color='secondary'/>
                                                    <small>{element.value === 0 ? null : element.value}</small>
                                                </div>
                                                <Like _id={element._id}/>
                                            </div>
                                        )
                                    })
                                }
                        </div>
                <div className="item">
                    <Event/>
                </div>
                </section>
        </Fragment>
    )
}
export default Home


