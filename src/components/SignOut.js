import React from 'react';
import { auth } from '../firebase';
import { Icon, Button } from 'bloomer';

const SignOutButton = () =>

  <Button
        onClick={auth.doSignOut}
      >
    <Icon className='fa fa-sign-out-alt' />
    Sign Out
  </Button>

export default SignOutButton;