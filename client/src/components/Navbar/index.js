import React from 'react';
import {Nav,  NavLink,  Bars,  NavMenu,  NavBtn,  NavBtnLink,} from './NavbarElements';

  
const Navbar = () => {
  return (
    <>
      <Nav>
        <Bars />
        <NavMenu>
          <img src={require('./logo.png')} alt='logo' />
          <NavLink to='/' activestyle='true'>
            Login
          </NavLink>
          <NavLink to='/register' activestyle='true'>
            Register
          </NavLink>
          <NavLink to='/home' activestyle='true'>
            Home
          </NavLink>
        </NavMenu>
        <NavBtn>
          <NavBtnLink to='/search'>Search</NavBtnLink>
        </NavBtn>
      </Nav>
    </>
  );
};
  
export default Navbar;