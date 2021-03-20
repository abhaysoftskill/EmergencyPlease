import {DELETE_DATA, GLOBAL_DATA} from '../actions/actions';

const intialState = {
  email: '',
  token: '',
  role:""
 
};
const commonReducer = (state = intialState, action) => {
  switch (action.type) {
    case GLOBAL_DATA:
      return Object.assign({}, state, action.payload);
    case DELETE_DATA:
      return intialState;
    default:
      return state;
  }
};
export default commonReducer;
