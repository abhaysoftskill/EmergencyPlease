
export const GLOBAL_DATA = 'GLOBAL_DATA';
export const DELETE_DATA = 'DELETE_DATA';
export const SERVICE_TYPE_ADD = 'SERVICE_TYPE_ADD';
export const SERVICE_TYPE_RESET = 'SERVICE_TYPE_RESET';

export const serviceTypeAdd = (serviceTypeID) => {
  try {
    return dispatch => {

      dispatch({
        type: SERVICE_TYPE_ADD,
        payload: serviceTypeID
      });
    };
  } catch (error) {
    // Add custom logic to handle errors
    console.log(error);
  }
};