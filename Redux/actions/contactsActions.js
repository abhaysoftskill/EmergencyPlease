

export const ADD_CONTACT = 'ADD_CONTACT';

export const addContact = (contacts) => {
  try {
    return dispatch => {
      dispatch({
        type: ADD_CONTACT,
        payload: contacts
      });
    };
  } catch (error) {
    // Add custom logic to handle errors
    console.log(error);
  }
};