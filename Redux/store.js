import { createStore, applyMiddleware, combineReducers } from "redux";
import thunk from "redux-thunk";
import commonReducer from "./reducers/commonReducer";
// import storage from 'redux-persist/lib/storage';
// import { persistReducer } from "redux-persist";
import AsyncStorage from "@react-native-community/async-storage";
import currentLocationReducer from "./reducers/currentLocationReducer";
import serviceReducer from "./reducers/serviceReducer";
import contactsReducer from "./reducers/contactsReducer";

const rootReducer = combineReducers({
    commonReducer: commonReducer,
    serviceReducer: serviceReducer,
    currentLocationReducer:currentLocationReducer,
    contactsReducer:contactsReducer
});

const config = {
    key: 'emergencyPlease',
    storage: AsyncStorage
}

// const persistedReducer = persistReducer(config, rootReducer);
const store = createStore(rootReducer, applyMiddleware(thunk))

export default store