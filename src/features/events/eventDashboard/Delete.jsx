import React from 'react'
import { deleteEventInFirestore } from '../../../app/firestore/firestoreService';
import firebase from '../../../app/config/firebase'
import { Button } from 'semantic-ui-react';
const Delete = ({event}) => {


    const user = firebase.auth().currentUser;
     console.log(user.uid);
      console.log(event.hostUid);
    return (
        <>
            {user.uid==event.hostUid &&
          <Button
            onClick={() => deleteEventInFirestore(event.id)}
            color='red'
            floated='right'
            content='Delete'
          />
            }
        </>
    )
}

export default Delete
