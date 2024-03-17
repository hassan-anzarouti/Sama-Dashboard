import paramsReducer, { QueryAction } from "../../base/base-reducer";
import { ICityQuery } from "../../model/cities/query";
import { toggleLoading } from "../../utils/helpers/functions";
import { CitiesLoading, IInternalState } from "./context";

type Action =
  | {
      type: "LOADING";
      payload: { loading: CitiesLoading | CitiesLoading[] };
    }
  | { type: "SET_LIST"; payload: { list: any } }
  | { type: "SET_DETAILS"; payload: { details?: any } }
  | QueryAction<ICityQuery>;

const reducer = (state: IInternalState, action: Action): IInternalState => {
  switch (action.type) {
    case "LOADING": {
      return {
        ...state,
        loading: toggleLoading(state.loading, action.payload.loading),
      };
    }
    case "SET_LIST": {
      return {
        ...state,
        list: action.payload.list,
      };
    }

    case "SET_DETAILS": {
      return {
        ...state,
        details: action.payload.details,
      };
    }
    default: {
      return paramsReducer(state, action);
    }
  }
};

export default reducer;
