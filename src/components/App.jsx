import React from "react";
import Header from "./Header";
import Footer from "./Footer";
import Container from './Container';
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";


import { ToastContainer } from "react-toastify";
import ModalManager from '../other feature/modals/ModalManager';
import AccountPage from './../other feature/Auth/AccountPage';



function App() {


  return (
    <div>
   <ModalManager />
      <ToastContainer position='bottom-right' hideProgressBar/>
              <Header />
      <Container />
      <Footer />
     <Route path='/account' component={AccountPage} />
       
    </div>
  );
}

export default App;
