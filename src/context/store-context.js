import { createContext, useReducer } from "react";
import ACTION_TYPES from "./action";

export const storeContext = createContext();

export const storeReducer = (state, action) => {
  switch (action.type) {
    case ACTION_TYPES.SET_LAT_LONG: {
      return { ...state, latLong: action.payload.latLong };
    }
    case ACTION_TYPES.SET_COFFEE_STORES: {
      return { ...state, coffeeStores: action.payload.coffeeStores };
    }
    default:
      return { ...state };
  }
};

export const StoreProvider = ({ children }) => {
  const initialState = {
    latLong: "",
    coffeeStores: [],
  };

  const [state, dispatch] = useReducer(storeReducer, initialState);
  return (
    <storeContext.Provider value={{ state, dispatch }}>
      {children}
    </storeContext.Provider>
  );
};