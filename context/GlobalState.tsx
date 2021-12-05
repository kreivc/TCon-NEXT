import { createContext, useReducer, useEffect, Reducer } from "react";
import reducers from "./Reducers";

export interface Auth {
	email: string;
	isConsultant: number;
	message: string;
	name: string;
	phone: string;
	status: boolean;
	userId: string;
}

interface IState {
	auth: Auth;
	loading: boolean;
}

const initialState = {
	auth: {} as Auth,
	loading: false,
};

export const DataContext = createContext(initialState);

export const DataProvider = ({ children }: React.PropsWithChildren<{}>) => {
	const [state, dispatch] = useReducer(reducers, initialState);

	useEffect(() => {
		dispatch({
			type: "AUTH",
			payload: JSON.parse(localStorage.getItem("user")),
		});
	}, []);

	return (
		<DataContext.Provider value={{ state, dispatch }}>
			{children}
		</DataContext.Provider>
	);
};
