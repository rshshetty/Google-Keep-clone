

import { toast } from 'react-toastify';
import firebase from './../../firebase';




export function firebaseObjectToArray(snapshot) {
  if (snapshot) {
    return Object.entries(snapshot).map(e=>Object.assign({},e[1],{id:e[0]}));
  }
}


export function signInWithEmail(creds) {
  return firebase
    .auth()
    .signInWithEmailAndPassword(creds.email, creds.password);

}

export function signOutFirebase() {
  return firebase.auth().signOut();
}

export async function registerInFirebase(creds) {
  try {
    const result = await firebase
      .auth()
      .createUserWithEmailAndPassword(creds.email, creds.password);

    await result.user.updateProfile({
      displayName: creds.displayName,
      
    });
    
  } catch (error) {
    throw error;
  }
}

export async function socialLogin(selectedProvider) {
  let provider;
  if (selectedProvider === 'facebook') {
    provider = new firebase.auth.FacebookAuthProvider();
  }
  if (selectedProvider === 'google') {
    provider = new firebase.auth.GoogleAuthProvider();
  }
  try {
    const result = await firebase.auth().signInWithPopup(provider);
    console.log(result);
    if (result.additionalUserInfo.isNewUser) {
  
    
    }
  } catch (error) {
    toast.error(error.message);
  }
}

export function updateUserPassword(creds) {
  const user = firebase.auth().currentUser;
  return user.updatePassword(creds.newPassword1);
}





export function addNote(values) {
  const user = firebase.auth().currentUser;
  const newNote = {
    displayName: user.displayName,
    uid: user.uid,
    title: values.title,
  content:values.content
      }
return firebase.database().ref(`note/${user.uid}`).push(newNote)

}



export function getEventChatRef() {
   const user = firebase.auth().currentUser;
return  firebase.database().ref(`note/${user.uid}`)
}