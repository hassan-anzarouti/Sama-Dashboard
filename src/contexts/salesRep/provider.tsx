import { useReducer } from "react";
import { execute } from "../../utils/api/api-execute";
import SalesRepContext, { internalState } from "./context";
import reducer from "./reducer";
import EndPoints from "../../services/end-points";
import { ISalesRepQuery } from "../../model/salesRep/query";

export interface IProps {
  children: React.ReactNode;
}
const SalesRepContextProvider: React.FC<IProps> = (props) => {
  const [state, dispatch] = useReducer(reducer, internalState);

  const getData = async () => {
    await execute({
      callback: async () => {
        dispatch({ type: "LOADING", payload: { loading: "list" } });

        const { data } = await EndPoints.salesRep.getData(state.query);

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

  const createSalesRep = async (request: any) => {
    await execute({
      callback: async () => {
        dispatch({
          type: "LOADING",
          payload: { loading: "create" },
        });

        console.log(request);

        await EndPoints.salesRep.createSalesRep(request);

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

  const updateSalesRep = async (id: number, request: any) => {
    await execute({
      callback: async () => {
        dispatch({
          type: "LOADING",
          payload: { loading: "update" },
        });

        console.log(request);

        await EndPoints.salesRep.updateSalesRep(request, id);
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

  const deleteSalesRep = async (id: number) => {
    await execute({
      callback: async () => {
        dispatch({
          type: "LOADING",
          payload: { loading: "delete" },
        });

        await EndPoints.salesRep.deleteSalesRep(id);

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

  const setQuery = (query: ISalesRepQuery) => {
    dispatch({ type: "SET_QUERY", payload: { query } });
  };

  return (
    <SalesRepContext.Provider
      value={{
        ...state,
        actions: {
          getData,
          getDetails,

          createSalesRep,
          updateSalesRep,
          deleteSalesRep,
          setQuery,
        },
      }}
    >
      {props.children}
    </SalesRepContext.Provider>
  );
};

export default SalesRepContextProvider;
