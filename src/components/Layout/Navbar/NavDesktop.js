import React from 'react';
import logo from '@src/static/logo.svg';

import Link from 'gatsby-link';
import { Link as SLink } from 'react-scroll';

import { NavItems, NavItem } from './Navbar.style';

import NavLinks from './NavLinks';
import ToggleSwitch from '@common/ToggleSwitch';

const NavDesktop = () => {
  return (
    <>
      
        <img src={logo} alt="Moeid Heidari" href="#home"/>
     

      <nav>
        <NavItems>
          <NavLinks NavItem={NavItem} />

          <NavItem>
            <Link to="/blog">blog</Link>
          </NavItem>
          {/* <NavItem>
            <ToggleSwitch />
          </NavItem> */}
        </NavItems>
      </nav>
    </>
  );
};

export default NavDesktop;
