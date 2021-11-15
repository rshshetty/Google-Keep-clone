import React,{useState} from 'react'
import { Field, Form, Formik } from "formik";
import { Loader } from "semantic-ui-react";
import { toast } from 'react-toastify';
import AddIcon from "@material-ui/icons/Add";
import Fab from "@material-ui/core/Fab";
import Zoom from "@material-ui/core/Zoom";
import { addNote } from '../firestore/firebaseService';
import { useSelector } from 'react-redux';
import TextareaAutosize from 'react-textarea-autosize';

const Noteform = ({ title, content, uid }) => {
  

  const { mode } = useSelector(state => state.event)

 const [isExpanded, setExpanded] = useState(false);
const {authenticated} = useSelector(state => state.auth);


 function expand() {
    setExpanded(true);
  }
 


if(authenticated){

    return (
    
    <Formik
      initialValues={{ title: '',content:""}}
   
      onSubmit={async (values, { setSubmitting, resetForm }) => {
        try {
          await addNote({...values});
          resetForm();
        } catch (error) {
          toast.error(error.message);
        } finally {
          setSubmitting(false);
     
        }
      }}
    >
      {({ isSubmitting}) => (

        <Form className='create-note'>
          <Field name='title'>
            {({field}) => (
                <div style={{position: 'relative'}} >
                    <Loader active={isSubmitting} />
                  {isExpanded && (<input
                    {...field}
                    placeholder='Title'
                  >

                  </input>)}
                </div>
            )}
            </Field>
  <Field name='content'>
            {({field}) => (
                <div style={{position: 'relative'}}>
                    <Loader active={isSubmitting} />
        <TextareaAutosize
                    onClick={expand}
                    minRows={isExpanded ? 3 : 1}
                    {...field}
                        placeholder='Take a note...'/>
                </div>
            )}
            </Field>



<Zoom in={isExpanded}>
              <Fab  type='submit' style={{ background: (mode==='dark'?'#808080':'#f5ba13') }}>
                <AddIcon />
              </Fab>
            </Zoom>
        </Form>
      )}
    </Formik>
    
    )















}
else {
  return(
    <div style={{margin:"auto",height:"50vh",width:'75vw',display:"flex",justifyContent:"center",flexDirection:"column"}}>
    <header style={{display:'flex',flexDirection:"column",alignItems:'center',backgroundColor:(mode==='dark'?'#808080':'#f5ba13')}}>
      <h1 style={{display:"flex"}}>Kindly sign in to use Keeper App</h1>
   
    
    
    
    
     <h1 style={{display:"flex"}}>You can read ,create ,update ,delete and access your notes  from any device</h1>
     <h1 style={{display:"flex"}}>Other Features include Searching notes ,Dark Mode & Updating Password</h1>
      </header>
  </div>
  );
}


}

export default Noteform;
