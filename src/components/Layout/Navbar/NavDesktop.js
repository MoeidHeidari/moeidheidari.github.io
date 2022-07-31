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
          <NavItem>
            <Link to="/publications">publications</Link>
          </NavItem>
          <NavItem>
            <Link to="/awards">awards</Link>
          </NavItem>
          <NavItem>
            <Link to="/presentations">presentations & lectures</Link>
          </NavItem>
          <NavItem>
            <Link to="/projects">projects</Link>
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
