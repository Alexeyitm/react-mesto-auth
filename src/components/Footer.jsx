import React from 'react';
import { Switch, Route } from 'react-router-dom';

function Footer() {
  
  return (
    <Switch>
      <Route path='/'>
        <footer className='footer'>
          <p className='footer__copyright'>&copy; 2022 Mesto Russia</p>
        </footer>
      </Route>
    </Switch>
  )
};

export default Footer;