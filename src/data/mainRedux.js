import { configureStore } from "@reduxjs/toolkit";
import infoSlice from "./UserInfo/infoSlice";
import eventSlice from "./UserInfo/eventSlice";

const store = configureStore({
  reducer: { userInfo: infoSlice, eventReducer: eventSlice },
});

export default store;
