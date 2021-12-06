import { RootState } from "./index";
import { createSlice, PayloadAction, createAsyncThunk } from "@reduxjs/toolkit";
import axios, { AxiosResponse } from "axios";

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

export interface LoginProps {
	email: string;
	password: string;
}

export const fetchByCreds = createAsyncThunk(
	"user/fetchByCreds",
	async (creds: LoginProps) => {
		const res = await axios.post("https://tcon-api.herokuapp.com/auth/login", {
			...creds,
		});
		try {
			const serializedState = JSON.stringify({ user: res.data });
			localStorage.setItem("user", serializedState);
		} catch {
			console.log("error");
		}
		return res.data;
	}
);

export const logout = createAsyncThunk("user/logout", () => {
	localStorage.removeItem("user");
	return initialState;
});

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
	extraReducers: (builder) => {
		builder.addCase(fetchByCreds.fulfilled, (state, action) => {
			state = action.payload;
		});
		builder.addCase(logout.fulfilled, (state, action) => {
			state = action.payload;
		});
	},
});

export const { loggedUser, logoutUser } = userSlice.actions;

export const selectUser = (state: RootState) => state.user;

export default userSlice.reducer;
