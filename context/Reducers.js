import { ACTIONS } from "./Actions";

const reducers = (state, action) => {
	switch (action.type) {
		case ACTIONS.AUTH:
			return {
				...state,
				auth: action.payload,
			};

		case ACTIONS.LOADING:
			return {
				...state,
				loading: action.payload,
			};

		default:
			return state;
	}
};

export default reducers;
