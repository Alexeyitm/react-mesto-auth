import React from 'react';
import { Route } from 'react-router-dom';

function Footer() {
  
  return (
    <Route path='/'>
      <footer className='footer'>
        <p className='footer__copyright'>&copy; {new Date().getFullYear()} Mesto Russia</p>
      </footer>
    </Route>
  )
};

export default Footer;