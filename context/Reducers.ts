import { ReducerAction, ReducerWithoutAction } from "react";
import { ACTIONS } from "./Actions";

interface ReducerPayload<P> {
	type: string;
	payload: P;
}

const reducers = function <S>(
	state: S,
	action: { type: string; payload: any }
) {
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
