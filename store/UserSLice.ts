import { RootState } from "./index";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export interface User {
	email: string;
	isConsultant: number;
	message: string;
	name: string;
	phone: string;
	status: boolean;
	userId: string;
}

const initialState: User = {
	email: "",
	isConsultant: 0,
	message: "",
	name: "",
	phone: "",
	status: false,
	userId: "",
};

export const userSlice = createSlice({
	name: "user",
	initialState,
	reducers: {
		loggedUser: (state, action: PayloadAction<User>) => {
			state = action.payload;
		},
		logoutUser: (state) => {
			state = initialState;
		},
	},
});

export const { loggedUser, logoutUser } = userSlice.actions;

export const selectUser = (state: RootState) => state.user;

export default userSlice.reducer;
