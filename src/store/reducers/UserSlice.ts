import {createSlice, PayloadAction} from "@reduxjs/toolkit";
import {stat} from "fs";
import {fetchUsers} from "./ActionCreator";

export interface IUser {
    id: number,
    email: string,
    password: string
}

interface UserState {
    users: IUser[],
    isLoading: boolean,
    isError: string
}

const initialState: UserState = {
    users: [],
    isLoading: false,
    isError: ''
}

export const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {},
    extraReducers: {
        [fetchUsers.fulfilled.type]: (state, action: PayloadAction<IUser[]>) => {
            state.isLoading = false
            state.isError = ''
            state.users = action.payload
        },
        [fetchUsers.pending.type]: (state) => {
            state.isLoading = true
        },
        [fetchUsers.rejected.type]: (state, action: PayloadAction<string>) => {
            state.isLoading = false
            state.isError = action.payload
        },
    }
})

export default userSlice.reducer
