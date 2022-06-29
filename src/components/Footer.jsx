import React from 'react';
import { Routes, Route } from 'react-router-dom';

function Footer() {
  return (
    <Routes>
      <Route 
        path='/'
        element={
          <footer className='footer'>
            <p className='footer__copyright'>&copy; 2022 Mesto Russia</p>
          </footer>
        }
      />
    </Routes>
  )
};

export default Footer;