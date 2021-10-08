import { createContext, useReducer, useEffect } from "react";
import reducers from "./Reducers";

const initialState = {
	auth: {},
	loading: false,
};

export const DataContext = createContext();

export const DataProvider = ({ children }) => {
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
