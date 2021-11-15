import React from "react";
import DeleteIcon from "@material-ui/icons/Delete";
import CancelOutlinedIcon from '@material-ui/icons/CancelOutlined';
import firebase from './../firebase';
import TurnedInIcon from '@material-ui/icons/TurnedIn';
import EditIcon from '@material-ui/icons/Edit';
import TextareaAutosize from 'react-textarea-autosize';


const Note=({ title, content,id}) =>{
  const [editNote, setEditNote] = React.useState(false);
  const [currentNote, setCurrentNote] = React.useState({
    id,
    editTitle: title,
    editContent: content,
  });

 



   const user = firebase.auth().currentUser;
  
  
 
  

  //delete operation
  const deleteNote = () => {
    const removeRef = firebase.database().ref(`note/${user.uid}`).child(`${id}`);
    removeRef.remove();
  
  }


  //update operation

  const UpdateNote = () => {
     setEditNote(true);
    const EditRef = firebase.database().ref(`note/${user.uid}`).child(`${id}`);
    EditRef.update({
 id: currentNote.id,
      title: currentNote.editTitle,
     content: currentNote.editContent
})
  setEditNote(false);
  }







  const handleDelete = () => {
    deleteNote(id);
  };

  const handleEdit = () => {
    setEditNote(true);
    setCurrentNote((prevValue) => ({ ...prevValue }));
  };

  const handleInputEdit = (event) => {
    const { name, value } = event.target;
    setCurrentNote((prevValue) => ({
      ...prevValue,
      [name]: value,
    }));
  };



  


  return (
    <div >
     
      
      {editNote ? (
        <div className='note'>
          <input
            type='text'
            name='editTitle'
            defaultValue={currentNote.editTitle}
             onChange={handleInputEdit}
            className='edit-input'
          />
          <TextareaAutosize
             name='editContent'
            defaultValue={currentNote.editContent}
            onInput='auto_grow'
            
             onChange={handleInputEdit}
            className='edit-input'
          />
           <CancelOutlinedIcon onClick={() => setEditNote(false)} />
         
          <TurnedInIcon onClick={UpdateNote} style={{ marginLeft: '4px' }} />
        </div>) :
        (<div className='note'>
          <h1>{title}</h1>
            <p>{content}</p>
            <EditIcon onClick={handleEdit} style={{ display: 'inline', marginRight: "10px" }} />

            <DeleteIcon onClick={handleDelete}/>
        </div>
  )
}
     
    </div>
  );
}

export default Note;
