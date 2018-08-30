import React from 'react';
import withAuthorization from './withAuthorization';
import {Title} from 'bloomer';

const HomePage = () =>
  <div>
    <Title isSize={1}>Home Page</Title>
    <p>The Home Page is accessible by every signed in user.</p>
  </div>

const authCondition = (authUser) => !!authUser;

export default withAuthorization(authCondition)(HomePage);