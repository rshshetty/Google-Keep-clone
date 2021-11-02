import React from 'react';
import { Menu, Image, Dropdown } from 'semantic-ui-react';
import { Link, useHistory } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { toast } from 'react-toastify';
import { signOutFirebase } from '../../other feature/firestore/firebaseService';

export default function SignedInMenu() {
  const {currentUser} = useSelector(state => state.auth);
  const history = useHistory();

  async function handleSignOut() {
    try {
      history.push('/');
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
          <Dropdown.Item as={Link} to='/account' text='My account' icon='settings' />
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
