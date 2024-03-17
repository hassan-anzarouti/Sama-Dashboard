import { useReducer } from "react";
import { execute } from "../../utils/api/api-execute";
import EmployeeContext, { internalState } from "./context";
import reducer from "./reducer";
import EndPoints from "../../services/end-points";
import { IPagination } from "../../model/pagination";

export interface IProps {
  children: React.ReactNode;
}
const EmployeeContextProvider: React.FC<IProps> = (props) => {
  const [state, dispatch] = useReducer(reducer, internalState);

  const getData = async () => {
    await execute({
      callback: async () => {
        dispatch({ type: "LOADING", payload: { loading: "list" } });

        const { data } = await EndPoints.employee.getData(state.query);

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

  const createEmployee = async (request: any) => {
    await execute({
      callback: async () => {
        dispatch({
          type: "LOADING",
          payload: { loading: "create" },
        });

        await EndPoints.employee.createEmployee(request);

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

  const updateEmployee = async (id: number, request: any) => {
    await execute({
      callback: async () => {
        dispatch({
          type: "LOADING",
          payload: { loading: "update" },
        });

        console.log(request);

        await EndPoints.employee.updateEmployee(request, id);
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

  const deleteEmployee = async (id: number) => {
    await execute({
      callback: async () => {
        dispatch({
          type: "LOADING",
          payload: { loading: "delete" },
        });

        await EndPoints.employee.deleteEmployee(id);

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

  const setQuery = (query: IPagination) => {
    dispatch({ type: "SET_QUERY", payload: { query } });
  };

  return (
    <EmployeeContext.Provider
      value={{
        ...state,
        actions: {
          getData,
          getDetails,

          createEmployee,
          updateEmployee,
          deleteEmployee,
          setQuery,
        },
      }}
    >
      {props.children}
    </EmployeeContext.Provider>
  );
};

export default EmployeeContextProvider;
