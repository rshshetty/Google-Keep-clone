import React from "react";
import HighlightIcon from "@material-ui/icons/Highlight";

import { Menu, Container} from 'semantic-ui-react';
import { NavLink } from 'react-router-dom';
import SignedOutMenu from "./nav/SignedOutMenu";
import SignedInMenu from "./nav/SignedInMenu";
import { useSelector } from 'react-redux';


function Header() {


 const {authenticated} = useSelector(state => state.auth);

  return (
 
    <Menu inverted fixed='top' style={{backgroundColor:'#cc8800'}}>
      <Container>
        <Menu.Item as={NavLink} exact to='/' header>
         <HighlightIcon />
          Keeper
        </Menu.Item>
 
        {authenticated ? (
          <SignedInMenu />
        ) : (
          <SignedOutMenu />
        )}
      </Container>
    </Menu>



  )
}
export default Header;
