import { createContext, useReducer, useEffect } from "react";
import reducers from "./Reducers";

export const DataContext = createContext();

export const DataProvider = ({ children }) => {
	const initialState = {
		// auth: JSON.parse(localStorage.getItem("user")) || null,
		auth: {},
	};
	const [state, dispatch] = useReducer(reducers, initialState);

	useEffect(() => {
		localStorage.setItem("user", JSON.stringify(state.user));
	}, [state.user]);

	return (
		<DataContext.Provider value={{ state, dispatch }}>
			{children}
		</DataContext.Provider>
	);
};
