import paramsReducer, { QueryAction } from "../../base/base-reducer";
import { IOrderQuery } from "../../model/orders/query";
import { toggleLoading } from "../../utils/helpers/functions";
import { IInternalState, OrdersLoading } from "./context";

type Action =
  | {
      type: "LOADING";
      payload: { loading: OrdersLoading | OrdersLoading[] };
    }
  | { type: "SET_LIST"; payload: { list: any } }
  | { type: "SET_DETAILS"; payload: { details?: any } }
  | QueryAction<IOrderQuery>;

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
