
export const APP_LOADED = 'APP_LOADED';



const initialState = {

  initialized: false,
};

export default function asyncReducer(state = initialState, { type}) {
  switch (type) {
  
    case APP_LOADED:
      return {
        ...state,
        initialized: true,
      };
    default:
      return state;
  }
}