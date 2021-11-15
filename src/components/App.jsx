import React,{useEffect} from "react";
import Header from "./Header";
import Footer from "./Footer";
import Container from './Container';
import { useSelector } from 'react-redux';
import { ToastContainer } from "react-toastify";
import ModalManager from '../other feature/modals/ModalManager';




function App() {

  const { mode } = useSelector(state => state.event)

 useEffect(() => {
     if(mode==='dark'){
       document.body.style.backgroundColor = "#292929"
     }
     else {
       document.body.style.backgroundColor = "#cc8800"
    }
    },[mode])

  return (
    <div>
   <ModalManager />
      <ToastContainer position='bottom-right' hideProgressBar/>
    <Header mode={mode}/>
      <Container />
      <Footer />
    </div>
  );
}

export default App;
