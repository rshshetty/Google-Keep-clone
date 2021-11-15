import React from 'react';
import { useSelector } from 'react-redux';

import LoginForm from '../Auth/LoginForm';
import RegisterForm from '../Auth/RegisterForm';
import AccountPage from '../../other feature/Auth/AccountPage';
export default function ModalManager() {
  const modalLookup = {
      LoginForm,
    RegisterForm,
      AccountPage
  };
  const currentModal = useSelector((state) => state.modals);
  let renderedModal;
  if (currentModal) {
    const { modalType, modalProps } = currentModal;
    const ModalComponent = modalLookup[modalType];
    renderedModal = <ModalComponent {...modalProps} />;
  }

  return <span>{renderedModal}</span>;
}