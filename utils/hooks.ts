import { UserState } from "../store";

export const getLocalStorage = (): UserState => {
	if (typeof window !== "undefined") {
		if (localStorage.getItem("user") != null) {
			return JSON.parse(localStorage.getItem("user"));
		} else {
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
	}
};
