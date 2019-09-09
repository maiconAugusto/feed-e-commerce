import React, { Fragment,useState, useEffect } from 'react'
import Headers from '../components/headers';
import './donations.css'
import api from '../config/api'
import { Favorite } from '@material-ui/icons';
import { BallClipRotateMultiple} from 'react-pure-loaders';

const Donations = (props)=>{
    const [ donations, setDonation ] = useState([])
    const [ spinner, setSpinner ]= useState('')

    useEffect(()=>{
        setSpinner(true)
        const response = JSON.parse(localStorage.getItem('user'))
            api.get(`/donations/${response.user._id}`)
                .then((response)=>{
                    setSpinner(false)
                    setDonation(response.data.product)
                })
    },[])
    return(
        <Fragment>
           <Headers/>
            <div className="container-donations">
                {donations.length ===0? <div className="loading-donations">
                                            <BallClipRotateMultiple color={"black"} loading={spinner}/>
                                        </div>:
                    donations.map(function(element){
                    return(
                        <div key={element._id} className="container-donations-ar" >
                            <div className="container-donations-card">
                                <img src={element.image} alt="Product"/>
                                <strong>{element.title}</strong>
                                <div className="container-like">
                                    <Favorite color='secondary'/>
                                    <small>{element.value === 0 ? null : element.value}</small>
                                </div>
                            </div>
                        </div>
                    )
                })}
            </div>
        </Fragment>
    )
}
export default Donations