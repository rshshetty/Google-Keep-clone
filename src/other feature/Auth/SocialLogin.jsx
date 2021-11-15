import React from 'react';
 import { Button } from 'semantic-ui-react';
import { useDispatch, useSelector } from 'react-redux';
import { closeModal } from '../modals/modalReducer';
import { socialLogin } from '../firestore/firebaseService';
// import { Button } from '@material-ui/core';

export default function SocialLogin() {
    const dispatch = useDispatch();
const { mode } = useSelector(state => state.event)


 let StylesLoad = {

    backgroundColor:( mode==='dark'&&'#808080'), 
    color: (mode=== 'dark' && '#FFFFFF' )

    }

    let StyleLoad1 = {
        marginBottom: 10,
        backgroundColor:( mode==='dark'&&'#808080'), 
    color: (mode=== 'dark' && '#FFFFFF' )
    }

    function handleSocialLogin(provider) {
        dispatch(closeModal());
        socialLogin(provider);
    }

    return (
        <>
            <Button onClick={() => handleSocialLogin('facebook')} icon='facebook' fluid color='facebook' style={StyleLoad1} content='Login with Facebook' />
            <Button onClick={() => handleSocialLogin('google')} icon='google' fluid color='google plus' style={StylesLoad} content='Login with Google' />
        </>
    )
}