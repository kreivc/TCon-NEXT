import { UserState } from "../store";

export const getLocalStorage = (): UserState => {
	try {
		return JSON.parse(localStorage.getItem("user"));
	} catch (error) {
		return undefined;
	}
};
