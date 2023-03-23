import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    user: null,
    token: null,
    favourites : []
};

export const authSlice = createSlice(
    {
        name: "auth",
        initialState,
        reducers: {
            setLogin: (state, action) => {
                state.token = action.payload.token;
            },
            setUser: (state,action) => {
                state.user = action.payload.user;
            },
            setLogout: (state) => {
                state.user = null;
                state.token = null;
            },
            setFavourites: (state, action) => {
                state.favourites = action.payload.favourites;
            },
        }
    }
)
export const {setLogin, setLogout, setFavourites, setUser} = authSlice.actions;
export default authSlice.reducer;