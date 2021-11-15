
import {
  
  LISTEN_TO_EVENT_CHAT,SET_MODE } from './eventConstants';



const initialState = {
 
  comments: [],
    mode:'light',
};





export default function eventReducer(state = initialState, { type, payload }) {
    switch (type) {
         

        case LISTEN_TO_EVENT_CHAT:
      return {
        ...state,
        comments: payload,
        };
         case SET_MODE:
          return {
            ...state,
            mode:payload,
          };

            default:
      return state;
  }
}
