import React from 'react';
import AuthUserContext from './AuthUserContext';
import { firebase } from '../firebase';

const withAuthentication = ( Component ) => {//Component is App passed from App.js exporting withAuthentication(App)
    class WithAuthentication extends React.Component {

        constructor(props){
            super(props);
        
            this.state = {
            authUser: null,
            }
        }
        componentDidMount(){
            firebase.auth.onAuthStateChanged(authUser => {      
                console.log(authUser)
                authUser
                    ? this.setState(() =>({authUser}))
                    : this.setState(() =>({authUser : null }))  
            })  
        }
            
        render(){
            const { authUser } = this.state
            return(
                <AuthUserContext.Provider value={authUser}>
                    <Component />
                </AuthUserContext.Provider>
            );
        }
    }
    return WithAuthentication;
}

export default withAuthentication;