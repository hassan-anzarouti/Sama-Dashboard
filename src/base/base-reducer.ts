import { INITIAL_PAGE } from "../utils/helpers/constants";

export type QueryAction<T> =
  | { type: "SET_SEARCH"; payload: { search?: string } }
  | { type: "SET_QUERY"; payload: { query?: T } };

const queryReducer = <T = any>(state: any, action: QueryAction<T>): any => {
  switch (action.type) {
    case "SET_SEARCH":
      return {
        ...state,
        query: {
          ...state.query,
          keyword: action.payload.search,
          page: INITIAL_PAGE,
          pageSize: state.query?.perPage,
        },
      };
    case "SET_QUERY":
      return {
        ...state,
        query: action.payload.query,
      };
    default:
      return state;
  }
};

export default queryReducer;
