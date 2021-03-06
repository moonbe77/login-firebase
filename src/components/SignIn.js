import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import { SignUpLink } from './SignUp';
import { auth } from '../firebase';
import * as routes from '../constants/routes';
import { Field, Label, Control, Input, Button, Columns, Column } from 'bloomer';
import { Box } from '../../node_modules/bloomer/lib/elements/Box';

const SignInPage = ({ history }) =>
  <div>    
    <Columns>
      <Column isSize='1/3' isOffset='1/3'>
        <h1>SignIn Page</h1>
        <Box>
          <SignInForm history={history} />
        </Box>
          <SignUpLink />
      </Column>
    </Columns>
  </div>

const byPropKey = (propertyName, value) => () => ({
  [propertyName]: value,
});

const INITIAL_STATE = {
  email: '',
  password: '',
  error: null,
};

class SignInForm extends Component {
  constructor(props) {
    super(props);

    this.state = { ...INITIAL_STATE };
  }

  onSubmit = (event) => {
    const {
      email,
      password,
    } = this.state;

    const {
      history,
    } = this.props;

    auth.doSignInWithEmailAndPassword(email, password)
      .then((user) => {
        this.setState(() => ({ ...INITIAL_STATE }));
        history.push(routes.HOME);
      })
      .catch(error => {
        this.setState(byPropKey('error', error));
      });

    event.preventDefault();
  }

  render() {
    const {
      email,
      password,
      error,
    } = this.state;

    const isInvalid =
      password === '' ||
      email === '';

    return (      
          <form onSubmit={this.onSubmit}>      
            <Field>
              <Label isSize='small'>Email </Label>
              <Control>
                <Input
                  type="text"
                  value={email}
                  onChange={event => this.setState(byPropKey('email', event.target.value))}
                  placeholder="Email Address"
                  />
              </Control>
            </Field>
            <Field>
              <Label isSize='small'>Pass </Label>
              <Control>
                <Input
                  value={password}
                  onChange={event => this.setState(byPropKey('password', event.target.value))}
                  type="password"
                  placeholder="Password"
                  />
              </Control>
            </Field>
              <Button disabled={isInvalid} type="submit">
                Sign In
              </Button>
              { error && <p>{error.message}</p> }
          </form>        
    );
  }
}

export default withRouter(SignInPage);

export {
  SignInForm,
};