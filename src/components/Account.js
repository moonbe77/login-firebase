import React from 'react';
import { Link } from 'react-router-dom';
import * as routes from '../constants/routes';
import { PasswordForgetLink } from './PasswordForget';
import AuthUserContext from './AuthUserContext';
import { Icon } from 'bloomer';

const LandingPage = ({ authUser }) =>        
    <AuthUserContext.Consumer>
        { authUser = authUser =>
          authUser 
            ?<DataUser user={authUser}/>
            : <Link to={routes.SIGN_IN}>
                <Icon className='fa fa-sign-in-alt' style={{ color: '#55acee' }} />
                  Sign In
                </Link>
        }
    </AuthUserContext.Consumer>

const DataUser = ({user}) =>
  <div>
    <h1>Account Page</h1>
    <p>{user.email}</p>
    <p>{user.uid}</p>
    <PasswordForgetLink />
  </div>

export default LandingPage;