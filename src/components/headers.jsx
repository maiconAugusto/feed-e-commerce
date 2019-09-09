import React from 'react'
import  { withRouter, NavLink , Route} from 'react-router-dom'
import './headers.css'
import Avatar from 'react-avatar'


const Headers = (props,history)=>{

    function handleLogoff(){
        localStorage.removeItem('user')
        props.history.push('/login')
    }
    return(
        <Route>
            <div className="container-header">
            <header >
                <div>
                    <nav>
                        <ul>
                            <li>
                                <NavLink style={{color: "white", textDecoration: "none"}}
                                activeStyle={{color: "white",textDecoration: "none"}} 
                                to="/donations">Doações</NavLink>
                            </li>
                        </ul>
                    </nav>
                </div>
                <div className="container-header-right" >
                    <button id="container-header-btn" onClick={()=> handleLogoff()}>Sair</button>
                </div>
            </header>
        </div>
        </Route>
    )
}
export default withRouter(Headers)