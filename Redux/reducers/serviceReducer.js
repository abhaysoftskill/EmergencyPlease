import { SERVICE_TYPE_ADD, SERVICE_TYPE_RESET } from '../actions/actions';

const intialState = {
  serviceType: ''

};
const serviceReducer = (state = intialState, action) => {
  switch (action.type) {
    case SERVICE_TYPE_ADD:
      return { ...state, service_type_id: action.payload };
    // return Object.assign({}, state, action.payload);
    case SERVICE_TYPE_RESET:
      return intialState;
    default:
      return state;
  }
};
export default serviceReducer;
