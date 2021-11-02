
import {
  
  LISTEN_TO_EVENT_CHAT } from './eventConstants';



const initialState = {
 
  comments: [],
  
};





export default function eventReducer(state = initialState, { type, payload }) {
    switch (type) {
         

        case LISTEN_TO_EVENT_CHAT:
      return {
        ...state,
        comments: payload,
      };

            default:
      return state;
  }
}
