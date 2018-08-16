import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { auth } from '../firebase';
import { Field, Label, Control, Input, Button, Columns, Column, Box } from 'bloomer';

const PasswordForgetPage = () =>
  <div>    
    <Columns>
      <Column isSize='1/3' isOffset='1/3'>
        <h1>Did you forget your password?</h1>
        <Box>
          <PasswordForgetForm />
        </Box>          
      </Column>
    </Columns>
  </div>

const byPropKey = (propertyName, value) => () => ({
  [propertyName]: value,
});

const INITIAL_STATE = {
  email: '',
  error: null,
};

class PasswordForgetForm extends Component {
  constructor(props) {
    super(props);

    this.state = { ...INITIAL_STATE };
  }

  onSubmit = (event) => {
    const {
      email
    } = this.state;


    auth.doPasswordReset(email)
      .then((user) => {
        this.setState(() => ({ ...INITIAL_STATE }));
      })
      .catch(error => {
        this.setState(byPropKey('error', error));
      });

    event.preventDefault();
  }

  render() {
    const {
      email,
      error
    } = this.state;

    const isInvalid = email === '';

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
              <Button disabled={isInvalid} type="submit">
                Reset my password
              </Button>
              { error && <p>{error.message}</p> }
          </form>        
    );
  }
}
const PasswordForgetLink = () =>
  <p style={{textAlign:'center'}}> 
    <Link to='/pw-forget' > Forgot Pasword?</Link>
  </p> 

export default PasswordForgetPage;

export {
  PasswordForgetForm,
  PasswordForgetLink
};