// // authSlice.js
// import { createSlice } from "@reduxjs/toolkit";

// const initialState = {
//   user: null,
//   token: localStorage.getItem("token") || null,
//   isAuthenticated: !!localStorage.getItem("token"),
// };

// export const updateUser = createSlice({
//   name: "auth",
//   initialState,
//   reducers: {
//     updateUser: (state, action) => {
//       state.user = { ...state.user, ...action.payload };
//     },
//   },
// });

// const authSlice = createSlice({
//   name: "auth",
//   initialState,
//   reducers: {
//     login: (state, action) => {
//       state.user = action.payload.user;
//       state.token = action.payload.token;
//       state.isAuthenticated = true;
//       localStorage.setItem("token", action.payload.token);
//       localStorage.setItem("user", JSON.stringify(action.payload.user));
//     },
//     logout: (state) => {
//       state.user = null;
//       state.token = null;
//       state.isAuthenticated = false;
//       localStorage.removeItem("token");
//       localStorage.removeItem("user");
//     },
//   },
// });

// export const { login, logout } = authSlice.actions;
// export default authSlice.reducer;

// authSlice.js
import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  user: JSON.parse(localStorage.getItem("user")) || null,
  token: localStorage.getItem("token") || null,
  isAuthenticated: !!localStorage.getItem("token"),
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    login: (state, action) => {
      state.user = action.payload.user;
      state.token = action.payload.token;
      state.isAuthenticated = true;
      localStorage.setItem("token", action.payload.token);
      localStorage.setItem("user", JSON.stringify(action.payload.user));
    },
    logout: (state) => {
      state.user = null;
      state.token = null;
      state.isAuthenticated = false;
      localStorage.removeItem("token");
      localStorage.removeItem("user");
    },
    updateUser: (state, action) => {
      state.user = { ...state.user, ...action.payload };
      localStorage.setItem("user", JSON.stringify(state.user));
    },
  },
});

export const { login, logout, updateUser } = authSlice.actions;
export default authSlice.reducer;
