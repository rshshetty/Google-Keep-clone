import React from 'react';
 import { Segment, Header, Button, Label } from 'semantic-ui-react';
import { Formik, Form } from 'formik';
import * as Yup from 'yup';
import MyTextInput from '../form/MyTextInput';
 import { Link } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { updateUserPassword } from '../firestore/firebaseService';
import ModalWrapper from '../modals/ModalWrapper';
import { closeModal } from '../modals/modalReducer';

export default function AccountPage() {
  const dispatch = useDispatch();

  const { currentUser } = useSelector((state) => state.auth);
const { mode } = useSelector(state => state.event)


 let StylesLoad = {

    backgroundColor:( mode==='dark'&&'#292929'), 
    color: (mode=== 'dark' && '#FFFFFF' )

    }



  return (
    <ModalWrapper size='mini' header='Update Password'>
      <Segment style={StylesLoad}
        //style={{ position: "relative", width: "25%", margin: "auto", bottom: "-100px" }}
      >
      <Header  dividing size='large' content='Account'
      style={{color:(mode==='dark'&&'#FFFFFF')}}
         
          
       />
      {currentUser.providerId === 'password' &&
      <>
        <Header color={mode==='dark'?'grey':'teal'} sub content='Change Password' />
        <p>Use this form to change your password</p>
        <Formik
          initialValues={{ newPassword1: '', newPassword2: '' }}
          validationSchema={Yup.object({
            newPassword1: Yup.string().required('Password is required'),
            newPassword2: Yup.string().oneOf(
              [Yup.ref('newPassword1'), null],
              'Passwords do not match'
            ).required('Re-enter Password'),
          })}
          onSubmit={async (values, {setSubmitting, setErrors}) => {
            try {
              await updateUserPassword(values);
               dispatch(closeModal());
            } catch (error) {
                setErrors({auth: error.message}); 
            } finally {
              setSubmitting(false);
              
            }
          }}
        >
          {({ errors, isSubmitting, isValid, dirty }) => (
            <Form className='ui form' >
              <MyTextInput
                name='newPassword1'
                type='password'
                placeholder='New Password'
              />
              <MyTextInput
                name='newPassword2'
                type='password'
                placeholder='Confirm Password'
              />
              {errors.auth && (
                <Label
                  basic
                  color='red'
                  style={{ marginBottom: 10 }}
                  content={errors.auth}
                />
              )}
              <Button
                style={{display: 'block'}}
                type='submit'
                disabled={!isValid || isSubmitting || !dirty}
                loading={isSubmitting}
                size='large'
            color={mode==='dark'?'grey':'teal'}
               
                content='Update password'
              />
            </Form>
          )}
        </Formik>
      </>}
      {currentUser.providerId === 'facebook.com' &&
      <>
        <Header color='teal' sub content='Facebook account' />
        <p>Please visit Facebook to update your account</p>
        <Button
          icon='facebook'
          color='facebook'
         as={Link}
          to='https://facebook.com'
          content='Go to Facebook'
        />
      </>}
      {currentUser.providerId === 'google.com' && 
      <>
        <Header color='teal' sub content='Google account' />
        <p>Please visit Google to update your account</p>
        <Button
          icon='google'
          color='google plus'
         as={Link}
          to='https://google.com'
          content='Go to Google'
        />
      </>}
    </Segment>
    </ModalWrapper >
  );
}