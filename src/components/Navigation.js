import React from 'react';
import { Link } from 'react-router-dom';
import * as routes from '../constants/routes';
import SignOutButton from './SignOut';
import { Navbar, NavbarItem, NavbarBurger, Icon, NavbarBrand, NavbarStart, NavbarEnd, NavbarDivider, NavbarDropdown, NavbarMenu, NavbarLink  } from 'bloomer';

import AuthUserContext from './AuthUserContext';

const Navigation = ({ authUser }) =>        
    <AuthUserContext.Consumer>
        {authUser => authUser
            ? <NavigationAuth user={authUser}/> 
            : <NavigationNonAuth />
        }
    </AuthUserContext.Consumer>
  
  const NavigationAuth = ({user}) =>    
    <div>
        <Navbar style={{ border: 'solid 1px #00D1B2', margin: '0' }}>
        <NavbarMenu >
            <NavbarStart>
              <NavbarItem><Link to={routes.HOME}>Home</Link></NavbarItem>
              <NavbarItem><Link to={routes.ACCOUNT}>Account</Link></NavbarItem>
                {/* <NavbarItem hasDropdown isHoverable>
                    <NavbarLink href='#/documentation'>Documentation</NavbarLink>
                    <NavbarDropdown>
                    <NavbarItem href='#/'>One A</NavbarItem>
                    <NavbarItem href='#/'>Two B</NavbarItem>
                    <NavbarDivider />
                    <NavbarItem href='#/'>Two A</NavbarItem>
                    </NavbarDropdown>
                  </NavbarItem> */}
            </NavbarStart>
            <NavbarEnd>
                <NavbarItem>
                    <SignOutButton />
                </NavbarItem>
            </NavbarEnd>
        </NavbarMenu>
        </Navbar>
    </div>

   const NavigationNonAuth = () =>
   <div>
   <Navbar style={{ border: 'solid 1px #00D1B2', margin: '0' }}>
    <NavbarMenu >
        <NavbarStart>
            <NavbarItem><Link to={routes.LANDING}>Landing</Link></NavbarItem>

            {/* <NavbarItem hasDropdown isHoverable>
                <NavbarLink href='#/documentation'>Documentation</NavbarLink>
                <NavbarDropdown>
                    <NavbarItem href='#/'>One A</NavbarItem>
                    <NavbarItem href='#/'>Two B</NavbarItem>
                    <NavbarDivider />
                    <NavbarItem href='#/'>Two A</NavbarItem>
                </NavbarDropdown>
            </NavbarItem> */}
        </NavbarStart>
        <NavbarEnd>
        <NavbarItem>
          <Link to={routes.SIGN_IN}>
            <Icon className='fa fa-sign-in-alt' style={{ color: '#55acee' }} />
              Sign In
            </Link>
          </NavbarItem>         
        </NavbarEnd>
    </NavbarMenu>
    </Navbar>
</div>
export default Navigation;