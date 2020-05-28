import React from 'react';

const contextValue = {
  state: null,
  dispatch: null,
};

export const ReducerContext = React.createContext(contextValue);

export const useCustomReducer = () => {
  return React.useContext(ReducerContext);
}