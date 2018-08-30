import React from 'react';
import { Link } from 'react-router-dom';
import * as routes from '../constants/routes';
import { PasswordForgetForm } from './PasswordForget';
import AuthUserContext from './AuthUserContext';
import { Icon, Section, Columns, Column, Box, Title } from 'bloomer';
import PasswordChangeForm from './PasswordChange';
import withAuthorization from './withAuthorization';

const AcountPage = ({ authUser }) =>        
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
    <Section>
      <h1>Account: {user.email} </h1>
    <p>{user.uid}</p>
    <Columns>
        <Column isSize={1/2}>
          <Box>
            <Title isSize='4'>Recupera tu password</Title>  
              <PasswordForgetForm />
          </Box>
        </Column>  
        <Column isSize={1/2}>
          <Box>
            <Title isSize='4'>Cambia tu password</Title>
            <PasswordChangeForm  data={user}/>
          </Box>
        </Column>
    </Columns>
    </Section>
  </div>

  const authCondition = (authUser) => !!authUser
    

export default withAuthorization(authCondition)(AcountPage);