import React from 'react';
import { PrivateRoutes, PublicRoutes } from './utils/routes';
import { BrowserRouter as Router } from 'react-router-dom'
import LoginContextContainer, { LoginContext } from './contexts/LoginContextContainer';
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.scss';

function App() {
  return (
    <Router>
      <LoginContextContainer>
        <LoginContext.Consumer>
          {loginContext => loginContext.user
            ? <PrivateRoutes />
            : <PublicRoutes />
          }
        </LoginContext.Consumer>
      </LoginContextContainer>
    </Router>
  );
}

export default App;
