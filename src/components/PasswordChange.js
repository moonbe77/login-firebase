import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { auth } from '../firebase';
import { Field, Label, Control, Input, Button, Icon } from 'bloomer';

const byPropKey = (propertyName, value) => () => ({
  [propertyName]: value,
});

const INITIAL_STATE = {
  passwordOne: '',
  passwordTwo: '',
  type : 'password',
  error: null
};

class PasswordChangeForm extends Component {
  constructor(props) {
    super(props);

    this.state = { ...INITIAL_STATE };
  }

  onSubmit = (event) => {
    event.preventDefault();
    const { passwordOne } = this.state;

    auth.doPasswordUpdate(passwordOne)
    .then((user) => {
      this.setState(() => ({ ...INITIAL_STATE }));
    })
    .catch(error => {
      this.setState(byPropKey('error', error));
    });
    
  }

  render() {
    const {
      passwordOne,
      passwordTwo,
      error
    } = this.state;

    const isInvalid = 
      passwordOne !== passwordTwo || 
      passwordOne === '';

    return (      
          <form onSubmit={this.onSubmit}>      
            <Field>
              <Label isSize='small'>New Password </Label>
              <Control hasIcons>
                <Input
                  id='passwordOne'
                  type={this.state.type}
                  value={passwordOne}
                  autoComplete="new-password"
                  onChange={event => this.setState(byPropKey('passwordOne', event.target.value))}
                  placeholder="New password"
                  />
                    <Icon isSize="small" isAlign="right"
                    onFocus = {event => this.setState(byPropKey( 'type', 'text'))}
                    onBlur = {event => this.setState(byPropKey( 'type', 'password'))} >
                        <span className="fa fa-eye-slash" 
                        ></span>
                    </Icon>
                  
                    <Button 
                      onFocus = {event => this.setState(byPropKey( 'type', 'text'))}
                      onBlur = {event => this.setState(byPropKey( 'type', 'password'))}>
                      </Button>
              </Control>
              <Label isSize="small">Confirm New Password </Label>
              <Control hasIcons>              
                <Input
                  id='passwordTwo'
                    type="password"
                    value={passwordTwo}
                    autoComplete="new-password"
                    onChange={event => this.setState(byPropKey('passwordTwo', event.target.value))}
                    placeholder="Confirm new password"
                    />
                    <Icon isSize="small" isAlign="right">
                      <span className="fa fa-eye-slash" />
                    </Icon>
              </Control>
            </Field>
              <Button disabled={isInvalid} type="submit">
                Change my password
              </Button>
              { error && <p>{error.message}</p> }
          </form>        
    );
  }
}
 

export default PasswordChangeForm;
