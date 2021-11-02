import React from "react";
import DeleteIcon from "@material-ui/icons/Delete";

import firebase from './../firebase';




const Note=({ uid, title, content,id}) =>{
  const [editNote, setEditNote] = React.useState(false);
  const [currentNote, setCurrentNote] = React.useState({
    id,
    editTitle: title,
    editContent: content,
  });

 



   const user = firebase.auth().currentUser;
  
  
  console.log(id);
  

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
    <div style={{marginTop:"100px" }}>
     
      
      {editNote ? (
        <div className='note'>
          <input
            type='text'
            name='editTitle'
            defaultValue={currentNote.editTitle}
             onChange={handleInputEdit}
            className='edit-input'
          />
          <textarea
            name='editContent'
            defaultValue={currentNote.editContent}
            row='1'
             onChange={handleInputEdit}
            className='edit-input'
          />
          <button onClick={() => setEditNote(false)}>Cancel</button>
          <button onClick={UpdateNote}>Save</button>
        </div>
      ) : (
          
          <div className='note'
            
             onDoubleClick={handleEdit}
          >
          <h1>{title}</h1>
            <p>{content}</p>
            <DeleteIcon onClick={handleDelete}/>
        </div>
  )
}
     
    </div>
  );
}

export default Note;
