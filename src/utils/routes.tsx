import React from 'react';
import { Switch, Route, Redirect } from 'react-router-dom';
import Home from '../pages/home';

export const PublicRoutes = () => {
  return (
    <Switch>
      <Route exact path='/' component={ Home }/>
      <Route render={ () => <Redirect to='/' /> }/>
    </Switch>
  )
}

export const PrivateRoutes = () => {
  return (
    <Switch>
      <Route exact path='/' component={ Home }/>
    </Switch>
  )
}
