import React, { useEffect} from 'react'
import './user.css'
import Fab from '@material-ui/core/Fab'
import { Edit } from '@material-ui/icons';
import { Route , withRouter} from 'react-router-dom'

const User = (props)=>{
    function handleEditProfile(){
        props.history.push(`/editProfile/${props.user._id}`)
    }
    return(
        <Route>
            <div className="container-user-profile">
                <div className="container-user-edit">
                    <img src={props.user.avatar} alt="User"/>
                    <Fab size='small' onClick={()=> handleEditProfile()}>
                        <Edit color='secondary'/>
                    </Fab>
                </div>
            </div>
        </Route>
    )
}
export default withRouter(User)