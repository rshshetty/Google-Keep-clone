
import { LISTEN_TO_EVENT_CHAT } from './eventConstants';








export function listenToEventChat(comments) {
  return {
    type: LISTEN_TO_EVENT_CHAT,
    payload: comments,
  };
}

