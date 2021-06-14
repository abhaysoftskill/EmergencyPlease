import { ADD_CONTACT } from '../actions/contactsActions';

const intialState = {
  contactsList: []

};
const contactsReducer = (state = intialState, action) => {
  switch (action.type) {
    case ADD_CONTACT:
      return { ...state, contactsList: action.payload };
    // return Object.assign({}, state, action.payload);
    // case SERVICE_TYPE_RESET:
    //   return intialState;
    default:
      return state;
  }
};
export default contactsReducer;
