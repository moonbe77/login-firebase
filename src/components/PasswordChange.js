import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { auth } from '../firebase';
import { Field, Label, Control, Input, Button, Icon } from 'bloomer';
import { Select } from 'bloomer/lib/elements/Form/Select';
import { Radio } from 'bloomer/lib/elements/Form/Radio';
import { Checkbox } from 'bloomer/lib/elements/Form/Checkbox';


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
  
  byPropKey = (propertyName, value) => () => ({
    [propertyName]: value,
  });

  showPass = (e) => {
    if(e.target.checked === true){
      this.setState({type : 'text'})
    }else{
      this.setState({type : 'password'})
    }
  }

  onSubmit = (event) => {
    event.preventDefault();
    const { passwordOne } = this.state;

    auth.doPasswordUpdate(passwordOne)
    .then((user) => {
      this.setState(() => ({ ...INITIAL_STATE }));
    })
    .catch(error => {
      this.setState(this.byPropKey('error', error));
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
              <input type="text" name="email" defaultValue={this.props.data.email} style={{'display':'none'}}/>
              <Label isSize='small'>New Password </Label>
              <Control hasIcons>
                <Input
                  id='passwordOne'
                  type={this.state.type}
                  value={passwordOne}
                  autoComplete="new-password"
                  onChange={event => this.setState(this.byPropKey('passwordOne', event.target.value))}
                  placeholder="New password"
                  />
                    <Icon  isAlign="right">
                     {
                       this.state.type === 'password' ?
                       <span className="fa fa-eye-slash"></span>:
                       <span className="fa fa-eye"></span>
                     }
                    </Icon>
                  
                    <Checkbox 
                      name='showPassword'                   
                      onClick = {this.showPass}>
                      Show Password
                      </Checkbox>
              </Control> 
              <Label isSize="small">Confirm New Password </Label>
              <Control hasIcons>              
                <Input
                  id='passwordTwo'
                    type="password"
                    value={passwordTwo}
                    autoComplete="new-password"
                    onChange={event => this.setState(this.byPropKey('passwordTwo', event.target.value))}
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
