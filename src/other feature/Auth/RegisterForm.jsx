import React from 'react';
import ModalWrapper from '../modals/ModalWrapper';
import { Formik, Form } from 'formik';
import * as Yup from 'yup';
import MyTextInput from '../form/MyTextInput';
import { Button, Label, Divider } from 'semantic-ui-react';
import { useDispatch, useSelector } from 'react-redux';

import { registerInFirebase } from '../firestore/firebaseService';
import SocialLogin from './SocialLogin';
import { closeModal } from '../modals/modalReducer';

export default function RegisterForm() {
    const dispatch = useDispatch();
const { mode } = useSelector(state => state.event)
    return (
        <ModalWrapper size='mini' header='Register to Keeper App'>
            <Formik
                initialValues={{displayName: '', email: '', password: ''}}
                validationSchema={Yup.object({
                    displayName: Yup.string().required(),
                    email: Yup.string().required().email(),
                    password: Yup.string().required()
                })}
         onSubmit={async (values, {setSubmitting, setErrors}) => {
                    try {
                        await registerInFirebase(values);
                        setSubmitting(false);
                        dispatch(closeModal());
                    } catch (error) {
                        setErrors({auth: 'Problem with username or password'});
                        setSubmitting(false);
                    }
                }}
            >
                {({isSubmitting, isValid, dirty, errors}) => (
                    <Form className='ui form'>
                        <MyTextInput name='displayName' placeholder='DisplayName' />
                        <MyTextInput name='email' placeholder='Email Address' />
                        <MyTextInput name='password' placeholder='Password' type='password' />
                        {errors.auth && <Label basic color='red' style={{marginBottom: 10}} content={errors.auth} />}
                        <Button 
                            loading={isSubmitting}
                            disabled={!isValid || !dirty || isSubmitting}
                            type='submit'
                            fluid
                            size='large'
                             color={mode==='dark'?'grey':'teal'}
                            content='Register'
                        />
                        <Divider horizontal  style={{color:(mode==='dark'&&'#FFFFFF')}}>Or</Divider>
                        <SocialLogin />
                    </Form>
                )}
            </Formik>
        </ModalWrapper>
    )
}