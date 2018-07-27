import React, { Component } from 'react';
import { Link, withRouter } from 'react-router-dom';
import { auth } from '../firebase';
import * as routes from '../constants/routes';
import {Field, Label, Control, Input, Button, Columns, Column, Notification} from 'bloomer';
import { Box } from '../../node_modules/bloomer/lib/elements/Box';

const SignUpPage = ({ history }) =>
  <div>
    <Columns>
      <Column isSize='1/3' isOffset='1/3'>
        <h1>SignUp</h1>
        <Box>
          <SignUpForm history={ history }/>
        </Box>
      </Column>
    </Columns>
  </div>

const INITIAL_STATE = {
  username: '',
  email: '',
  passwordOne: '',
  passwordTwo: '',
  error: null,
};

const byPropKey = (propertyName, value) => () => ({
  [propertyName]: value,
});

class SignUpForm extends Component {
  constructor(props) {
    super(props);
    this.state = { ...INITIAL_STATE}
  }

  onSubmit = (event) => {
    const {
      username,
      email,
      passwordOne,
    } = this.state;

    const { history, }=this.props;

    auth.doCreateUserWithEmailAndPassword(email, passwordOne)
      .then(authUser => {
        this.setState(() => ({ ...INITIAL_STATE }));
        history.push( routes.HOME )
      })
      .catch(error => {
        this.setState(byPropKey('error', error));
      });

    event.preventDefault();
  }

  render() {
    const {
      username,
      email,
      passwordOne,
      passwordTwo,
      error,
    } = this.state;

    const isInvalid =
      passwordOne !== passwordTwo ||
      passwordOne === '' ||
      email === '' ||
      username === '';

    return (      
      <form onSubmit={this.onSubmit}>
      <Field>
        <Label></Label>
        <Input
          value={username}
          onChange={event => this.setState(byPropKey('username', event.target.value))}
          type="text"
          placeholder="Full Name"
        />
        <Control>
        </Control>
      </Field>
      <Field>
        <Label></Label>
        <Input
          value={email}
          onChange={event => this.setState(byPropKey('email', event.target.value))}
          type="text"
          placeholder="Email Address"
        />
        <Control>
        </Control>
      </Field>
      <Field>
        <Label></Label>
         <Input
          value={passwordOne}
          onChange={event => this.setState(byPropKey('passwordOne', event.target.value))}
          type="password"
          placeholder="Password"
        />
        <Control>
        </Control>
      </Field>
      <Field>
        <Label></Label>
        <Input
          value={passwordTwo}
          onChange={event => this.setState(byPropKey('passwordTwo', event.target.value))}
          type="password"
          placeholder="Confirm Password"
        />
        <Control>
        </Control>
      </Field>      
        
        <Button disabled={isInvalid} type="submit" isColor='primary'>
          Sign Up
        </Button>
        
          { error && <Notification>{error.message}</Notification> }
        
      </form>
    );
  }
}

const SignUpLink = () =>
  <p>
    Don't have an account?
    {' '}
    <Link to={routes.SIGN_UP}>Sign Up</Link>
  </p>

export default withRouter( SignUpPage );

export {
  SignUpForm,
  SignUpLink,
};