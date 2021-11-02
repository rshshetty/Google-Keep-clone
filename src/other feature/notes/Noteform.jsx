import React,{useState} from 'react'
import { Field, Form, Formik } from "formik";
import { Button, Loader } from "semantic-ui-react";
import { toast } from 'react-toastify';
import AddIcon from "@material-ui/icons/Add";
import Fab from "@material-ui/core/Fab";
import Zoom from "@material-ui/core/Zoom";
import * as Yup from 'yup';
import { addNote } from '../firestore/firebaseService';
import { useSelector } from 'react-redux';

const Noteform = ({title,content,uid}) => {


 const [isExpanded, setExpanded] = useState(false);
const {authenticated} = useSelector(state => state.auth);


 function expand() {
    setExpanded(true);
  }
  

  

if(authenticated){

    return (
    
    <Formik
      initialValues={{ title: '',content:""}}
      validationSchema={Yup.object({
        title: Yup.string().required(),
        content: Yup.string().required()
      })}
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
      {({ isSubmitting, handleSubmit, isValid }) => (

        <Form className='create-note'>
          <Field name='title'>
            {({field}) => (
                <div style={{position: 'relative'}} >
                    <Loader active={isSubmitting} />
                  {isExpanded && (<input
                    {...field}
                    placeholder='Title'
                    onKeyPress={(e) => {
                      if (e.key === 'Enter' && e.shiftKey) {
                        return;
                      }
                      if (e.key === 'Enter' && !e.shiftKey) {
                        e.preventDefault();
                        isValid && handleSubmit();
                      }
                    }}
                  >

                  </input>)}
                </div>
            )}
            </Field>
  <Field name='content'>
            {({field}) => (
                <div style={{position: 'relative'}}>
                    <Loader active={isSubmitting} />
                  <textarea
                     onClick={expand}
                        rows={isExpanded ? 3:1} {...field} 
                        placeholder='Take a note...'
                        onKeyPress={(e) => {
                            if (e.key === 'Enter' && e.shiftKey) {
                                return;
                            }
                            if (e.key === 'Enter' && !e.shiftKey) {
                                e.preventDefault();
                                isValid && handleSubmit();
                            }
                        }}
                    >

                    </textarea>
                </div>
            )}
            </Field>



<Zoom in={isExpanded}>
              <Fab loading={isSubmitting} type='submit' >
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
    <>
    <header style={{margin:"auto",height:"100vh",display:"flex",alignItems:"center",justifyContent:"center",flexDirection:"column"}}>
      <h1 style={{textAlign:"center",top:"50%",width:"50%",display:"flex"}}>Kindly sign in to use Keeper App</h1>
   
    
    
    
    
     <h1>You can read ,create ,update ,delete your notes and access from any device</h1>
     </header>
  </>
  );
}


}

export default Noteform;
