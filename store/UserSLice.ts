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

export const login = createAsyncThunk(
	"user/login",
	async (creds: LoginProps) => {
		const res = await axios.post("https://tcon-api.herokuapp.com/auth/login", {
			...creds,
		});
		if (res.data.userId !== "") {
			const serializedState = JSON.stringify({ user: res.data });
			localStorage.setItem("user", serializedState);
			axios.put(
				"https://api.chatengine.io/users/",
				{
					username: res.data.email,
					secret: res.data.userId,
				},
				{ headers: { "Private-key": "149fa814-bb6f-4f6c-9760-5af0d867a318" } }
			);
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
		builder.addCase(login.fulfilled, (state, action) => {
			state.data = action.payload;
		});
		builder.addCase(logout.fulfilled, (state) => {
			state.data = initialState.data;
		});
	},
});

export const selectUser = (state: RootState) => state.user.data;

export default userSlice.reducer;
