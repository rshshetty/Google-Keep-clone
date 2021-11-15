import React from "react";
import HighlightIcon from "@material-ui/icons/Highlight";
import '../style.css'
import { Menu, Container} from 'semantic-ui-react';

import SignedOutMenu from "./nav/SignedOutMenu";
import SignedInMenu from "./nav/SignedInMenu";
import { useSelector } from 'react-redux';
import DarkMode from "./nav/DarkMode";





function Header({mode}) {
const Styles = {
backgroundColor:(mode==='dark'?'#292929':'#cc8800')
  

}

 const {authenticated} = useSelector(state => state.auth);

  return (

    <Menu inverted fixed='top' style={Styles} >
      <Container>
        <Menu.Item
        
          style={{ border: 'none' }} header>
         <HighlightIcon />
         Keeper
        </Menu.Item>
        <DarkMode mode={mode}/>
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
