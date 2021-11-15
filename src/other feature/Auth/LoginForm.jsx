import React,{useState} from 'react';
import { Formik, Form } from 'formik';
import * as Yup from 'yup';
 import { Button, Label, Divider } from 'semantic-ui-react';
import { useDispatch, useSelector } from 'react-redux';
import { signInWithEmail } from '../firestore/firebaseService';
import { closeModal } from '../modals/modalReducer';
import MyTextInput from '../form/MyTextInput';
import SocialLogin from './SocialLogin';
import ModalWrapper from '../modals/ModalWrapper';

 const initialValues = { email: '', password: '' }

const savedValues={email:'daina@test.com', password:'123456'}
  const validationSchema=Yup.object({
                    email: Yup.string().required().email(),
                    password: Yup.string().required()
  })

export default function LoginForm() {
    const dispatch = useDispatch();
const { mode } = useSelector(state => state.event)
    let [loadvalues, SetLoadvalues] = useState(null)
    
    let StylesLoad = {
      marginBottom:'20px',borderRadius:'3px',padding:'5px',
    backgroundColor:( mode==='dark'&&'#808080'), 
    color: (mode=== 'dark' && '#FFFFFF' )

    }



    return (
         <ModalWrapper size='mini' header='Sign in to Keeper App'>
            <Formik
                initialValues={loadvalues || initialValues}
                validationSchema={validationSchema}
                 enableReinitialize
                onSubmit={async (values, {setSubmitting, setErrors}) => {
                    try {
                        await signInWithEmail(values);
                        setSubmitting(false);
                        dispatch(closeModal());
                    } catch (error) {
                        setErrors({auth: 'Problem with username or password'});
                        setSubmitting(false);
                    }
                }}
                
            >
                {({isSubmitting,isValid,errors}) => (
                    <Form className='ui form' style={{ display: "flex", flexDirection: 'column'}}>
                        
    <button type="button" style={StylesLoad}
                   onClick={()=>SetLoadvalues(savedValues)}
                  >    Load saved credentials
                  </button>

                        <MyTextInput name='email' placeholder='Email Address' />
                        <MyTextInput name='password' placeholder='Password' type='password' />
                        {errors.auth && <Label basic color='red' style={{marginBottom: 10}} content={errors.auth} />}
                        <Button 
                            loading={isSubmitting}
                            disabled={!isValid || isSubmitting}
                            type='submit'
                            fluid
                            size='large'
                            color={mode==='dark'?'grey':'teal'}
                            content='Login'
                        />
                        <Divider horizontal style={{color:(mode==='dark'&&'#FFFFFF')}}>Or</Divider>
                        <SocialLogin />
                    </Form>
                )}
            </Formik>
        </ModalWrapper>
    )
}