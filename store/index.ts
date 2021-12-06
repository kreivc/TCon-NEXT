import { Action, configureStore, ThunkAction } from "@reduxjs/toolkit";
import user, { User } from "./UserSLice";

export interface UserState {
	user?: User;
}

export const loadState = () => {
	console.log("load");
	try {
		const serializedState = localStorage.getItem("user");
		if (!serializedState) return undefined;
		return JSON.parse(serializedState);
	} catch (e) {
		return {
			user: {
				email: "",
				isConsultant: 0,
				message: "",
				name: "",
				phone: "",
				status: false,
				userId: "",
			},
		};
	}
};

export const store = configureStore({
	reducer: { user },
	// preloadedState: loadState(),
});

// store.subscribe(() => {
// 	console.log("getState", store.getState());
// 	saveState(store.getState());
// });

export const saveState = (state: UserState) => {
	console.log("save");
	try {
		const serializedState = JSON.stringify(state);
		localStorage.setItem("user", serializedState);
	} catch {
		console.log("error");
	}
};

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
export type AppThunk<ReturnType = void> = ThunkAction<
	ReturnType,
	RootState,
	unknown,
	Action<string>
>;
