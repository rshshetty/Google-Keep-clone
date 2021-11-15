
import { LISTEN_TO_EVENT_CHAT, SET_MODE } from './eventConstants';








export function listenToEventChat(comments) {
  return {
    type: LISTEN_TO_EVENT_CHAT,
    payload: comments,
  };
}

export function set_mode(mode){
  return{
    type:SET_MODE,
    payload:mode
  }
}