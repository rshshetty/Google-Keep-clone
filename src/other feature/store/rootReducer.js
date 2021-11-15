import {combineReducers} from 'redux';


import modalReducer from '../modals/modalReducer';
import authReducer from '../Auth/authReducers';

import eventReducer from './../../components/ContextApi/eventReducers';

const rootReducer = combineReducers({
  
    event:eventReducer,
    modals: modalReducer,
    auth: authReducer,

})

export default rootReducer;