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

const initialState = {
	data: {} as User,
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
	reducers: {},
	extraReducers: (builder) => {
		builder.addCase(fetchByCreds.fulfilled, (state, action) => {
			state.data = action.payload;
		});
		builder.addCase(logout.fulfilled, (state) => {
			state.data = initialState.data;
		});
	},
});

export const selectUser = (state: RootState) => state.user.data;

export default userSlice.reducer;
