import { useReducer } from "react";
import { execute } from "../../utils/api/api-execute";
import OrderContext, { internalState } from "./context";
import EndPoints from "../../services/end-points";
import reducer from "./reducer";
import { IRegionQuery } from "../../model/regions/query";

export interface IProps {
  children: React.ReactNode;
}
const OrderContextProvider: React.FC<IProps> = (props) => {
  const [state, dispatch] = useReducer(reducer, internalState);

  const getData = async () => {
    await execute({
      callback: async () => {
        dispatch({ type: "LOADING", payload: { loading: "list" } });

        const { data } = await EndPoints.order.getData(state.query);

        dispatch({ type: "SET_LIST", payload: { list: data } });
      },
      fallback: (error) => {},
      finallyCallback: () => {
        dispatch({ type: "LOADING", payload: { loading: "list" } });
      },
      throwException: false,
    });
  };

  const getDetails = async (data: any) => {
    await execute({
      callback: async () => {
        dispatch({ type: "LOADING", payload: { loading: "details" } });

        dispatch({ type: "SET_DETAILS", payload: { details: data } });
      },
      fallback: (error) => {},
      finallyCallback: () => {
        dispatch({ type: "LOADING", payload: { loading: "details" } });
      },
      throwException: false,
    });
  };

  const setDetails = async (data?: any) => {
    // dispatch({ type: 'SET_DETAILSS', payload: { details: data } })
  };

  const createOrder = async (request: any) => {
    await execute({
      callback: async () => {
        dispatch({
          type: "LOADING",
          payload: { loading: "create" },
        });

        console.log(request);

        await EndPoints.order.createOrder(request);

        getData();
      },
      fallback: (error) => {},
      finallyCallback: () => {
        dispatch({
          type: "LOADING",
          payload: { loading: "create" },
        });
      },
      throwException: true,
    });
  };

  const updateOrder = async (id: number, request: any) => {
    await execute({
      callback: async () => {
        dispatch({
          type: "LOADING",
          payload: { loading: "update" },
        });

        console.log(request);

        await EndPoints.order.updateOrder(request, id);
      },
      fallback: (error) => {},
      finallyCallback: () => {
        dispatch({
          type: "LOADING",
          payload: { loading: "update" },
        });
      },
      throwException: true,
    });
  };

  const deleteOrder = async (id: number) => {
    await execute({
      callback: async () => {
        dispatch({
          type: "LOADING",
          payload: { loading: "delete" },
        });

        await EndPoints.order.deleteOrder(id);

        getData();
      },
      fallback: (error) => {},
      finallyCallback: () => {
        dispatch({
          type: "LOADING",
          payload: { loading: "delete" },
        });
      },
      throwException: true,
    });
  };

  const setQuery = (query: IRegionQuery) => {
    dispatch({ type: "SET_QUERY", payload: { query } });
  };

  return (
    <OrderContext.Provider
      value={{
        ...state,
        actions: {
          getData,
          getDetails,

          createOrder,
          updateOrder,
          deleteOrder,
          setQuery,
        },
      }}
    >
      {props.children}
    </OrderContext.Provider>
  );
};

export default OrderContextProvider;
