import { configureStore, ThunkAction, Action } from "@reduxjs/toolkit";
import opitionpostSlice from "./opitionpostSlice";

import userReducer from "./features/login/loginSlice";
import addInfoSlice from "./features/Add-Info/addInfoSlice"
import getInfoSlice from "./features/info/infoSlice"
import addPostSlice from "./features/Add-Post/addPostSlice"
import getPostSlice from "./features/post/postSlice"
import addCmtSlice from "./features/Add-Cmt/addCmtSlice";
import friendSlice from "./features/Not-Friend/friendSlice";
const store = configureStore({
  reducer: {
    user: userReducer,
    addInfo:addInfoSlice,
    info:getInfoSlice,
    opition: opitionpostSlice,
    addPost:addPostSlice,
    post:getPostSlice,
    addCmt:addCmtSlice,
    getFrined: friendSlice
  },
});

export type RootState = ReturnType<typeof store.getState>;
export default store;
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>;
