import React, { Fragment } from 'react'
import './user.css'
import Fab from '@material-ui/core/Fab'
import { Edit } from '@material-ui/icons';
import { withRouter, NavLink} from 'react-router-dom'

const User = (props)=>{
    function handleEditProfile(){
        props.history.push(`/editProfile/${props.user._id}`)
    }
    return(
        <Fragment>
            <div className="container-user-profile">
                <div className="container-user-edit">
                    <img src={props.user.avatar} alt="User"/>
                    <Fab size='small' onClick={()=> handleEditProfile()}>
                        <Edit color='secondary'/>
                    </Fab>
                </div>
                <div className="container-itens">
                    <section>
                        <nav>
                            <ul>
                                <li>
                                    <NavLink style={{color: "white", textDecoration: "none"}}
                                    activeStyle={{color: "white",textDecoration: "none"}} 
                                    to="/donations">desapegos</NavLink>
                                </li>
                                <li>
                                    interesses
                                </li>
                                <li>
                                    trocas de itens
                                </li>
                                <li>
                                    Doações
                                </li>
                            </ul>
                        </nav>
                    </section>
                </div>
            </div>
        </Fragment>
    )
}
export default withRouter(User)