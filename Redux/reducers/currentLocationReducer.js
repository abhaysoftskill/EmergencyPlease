import { GET_CURRENT_LOCATION } from "../actions/currentLocationActions";



const initialState = {
    coordinates: [],
  };

  function currentLocationReducer(state = initialState, action) {
    switch (action.type) {
      case GET_CURRENT_LOCATION:
        return { ...state, coordinates: action.payload };
    //   case ADD_TO_BOOKMARK_LIST:
    //     return { ...state, bookmarks: [...state.bookmarks, action.payload] };
    //   case REMOVE_FROM_BOOKMARK_LIST:
    //     return {
    //       ...state,
    //       bookmarks: state.bookmarks.filter(book => book.id !== action.payload.id)
    //     };
      default:
        return state;
    }
  }
  
  export default currentLocationReducer;