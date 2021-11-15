import React,{useState} from 'react'
import CreateArea from './CreateArea';
import Note from './Note';
import { useEffect } from 'react';
import { getEventChatRef } from '../other feature/firestore/firebaseService';
import { listenToEventChat } from './ContextApi/eventActions';
import { firebaseObjectToArray } from '../other feature/firestore/firebaseService';
import { useDispatch, useSelector } from 'react-redux';
import firebase from './../firebase';



const Container = () => {
 

  const user = firebase.auth().currentUser;
  
  const [searchTerm,setSearchTerm]=useState('')
  


  const dispatch = useDispatch();
const {comments} = useSelector(state => state.event);
const {authenticated} = useSelector(state => state.auth);
 
 

  
  useEffect(() => {
    if (user) {
      getEventChatRef(user.uid).on('value', snapshot => {
        if (!snapshot.exists()) return;
        dispatch(listenToEventChat(firebaseObjectToArray(snapshot.val())));
      })
    }
    else {
      return null;
    }
      },[user,dispatch])
  

  return (
    <div style={{ margin: "80px" }}>
      {authenticated && (
      <input type="text" placeholder="Search.." onChange={(event) => { setSearchTerm(event.target.value) }} style={{position:'relative',zIndex:11111,borderRadius:"10px",width:"15%",height:"30px"}}/>
    )}
      <CreateArea  
        />
      {
    comments.filter((val) => {
      if (searchTerm === "") {
        return val
      } else if (val.title.toLowerCase().includes(searchTerm.toLowerCase()) || val.content.toLowerCase().includes(searchTerm.toLowerCase())) {
        return val
      } else return null;

    })
    .map((n,index) => {
        return (
        <Note
           key={index}
            id={n.id}
            uid={n.uid}
          title={n.title}
            content={n.content}
            n={n}
           
          />)
        
})}

      
    </div>
  );
}

export default Container
