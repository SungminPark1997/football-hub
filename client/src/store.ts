import { configureStore, combineReducers } from "@reduxjs/toolkit";
import authReducer from "./features/user/authSlice";

// 리듀서 결합
const rootReducer = combineReducers({
  auth: authReducer,
});

// 루트 상태 타입 정의
export type RootState = ReturnType<typeof rootReducer>;

// 로컬 스토리지에서 상태를 불러오는 함수
const loadState = () => {
  try {
    const serializedState = localStorage.getItem("state");
    if (serializedState === null) return undefined;
    return JSON.parse(serializedState);
  } catch (err) {
    return undefined;
  }
};

// 로컬 스토리지에 상태를 저장하는 함수
const saveState = (state: RootState) => {
  try {
    const serializedState = JSON.stringify(state);
    localStorage.setItem("state", serializedState);
  } catch (err) {
    // Ignore write errors
  }
};

const preloadedState = loadState();

const store = configureStore({
  reducer: rootReducer,
  preloadedState,
});

store.subscribe(() => {
  saveState(store.getState());
});

export type AppDispatch = typeof store.dispatch;

export default store;
