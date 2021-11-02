import React from "react";
import ReactDOM from "react-dom";
import 'semantic-ui-css/semantic.min.css';
import 'react-toastify/dist/ReactToastify.min.css';
import { BrowserRouter } from 'react-router-dom';
import App from "./components/App";
import { Provider } from 'react-redux';

import "./style.css"
import { configureStore } from './other feature/store/configureStore';


const store = configureStore();

ReactDOM.render(
    <Provider store={store}>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </Provider>, document.getElementById("root"));
