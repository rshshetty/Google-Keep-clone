import React from 'react';
import { Menu, Image, Dropdown } from 'semantic-ui-react';
import { useSelector, useDispatch } from 'react-redux';
import { toast } from 'react-toastify';
import { signOutFirebase } from '../../other feature/firestore/firebaseService';
import { openModal } from './../../other feature/modals/modalReducer';

export default function SignedInMenu() {
   const dispatch = useDispatch();
  const {currentUser} = useSelector(state => state.auth);
 

  async function handleSignOut() {
    try {
      await signOutFirebase();
     window.location.reload();
    } catch (error) {
      toast.error(error.message);
    }
  }

  return (
    <Menu.Item position='right'>
      <Image avatar spaced='right' src={currentUser.photoURL || 'user.png'} />
      <Dropdown pointing='top left' text={currentUser.displayName}>
        <Dropdown.Menu>
    
          {/* <Dropdown.Item text='My profile' icon='user' /> */}
          <Dropdown.Item  onClick={() => dispatch(openModal({modalType: 'AccountPage'}))} text='My account' icon='settings' />
          <Dropdown.Item
            onClick={handleSignOut}
            text='Sign out'
            icon='power'
          />
        </Dropdown.Menu>
      </Dropdown>
    </Menu.Item>
  );
}
