import { useReducer } from "react";
import { execute } from "../../utils/api/api-execute";
import RegionContext, { internalState } from "./context";

import http from "../../api/axios";
import EndPoints from "../../services/end-points";
import reducer from "./reducer";
import { IPagination } from "../../model/pagination";
import { IRegionQuery } from "../../model/regions/query";

export interface IProps {
  children: React.ReactNode;
}
const RegionContextProvider: React.FC<IProps> = (props) => {
  const [state, dispatch] = useReducer(reducer, internalState);

  const getData = async () => {
    await execute({
      callback: async () => {
        dispatch({ type: "LOADING", payload: { loading: "list" } });

        const { data } = await EndPoints.region.getData(state.query);

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

  const createRegion = async (request: any) => {
    await execute({
      callback: async () => {
        dispatch({
          type: "LOADING",
          payload: { loading: "create" },
        });

        console.log(request);

        await EndPoints.region.createRegion(request);

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

  const updateRegion = async (id: number, request: any) => {
    await execute({
      callback: async () => {
        dispatch({
          type: "LOADING",
          payload: { loading: "update" },
        });

        console.log(request);

        await EndPoints.region.updateRegion(request, id);
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

  const deleteRegion = async (id: number) => {
    await execute({
      callback: async () => {
        dispatch({
          type: "LOADING",
          payload: { loading: "delete" },
        });

        await EndPoints.region.deleteRegion(id);

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
    <RegionContext.Provider
      value={{
        ...state,
        actions: {
          getData,
          getDetails,

          createRegion,
          updateRegion,
          deleteRegion,
          setQuery,
        },
      }}
    >
      {props.children}
    </RegionContext.Provider>
  );
};

export default RegionContextProvider;
