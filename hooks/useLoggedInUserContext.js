import React from 'react';
import { get } from 'lodash/object';

export const createLoggedInUser = user => ({ loggedInUser: user });

export const getLoggedInUser = loggedInUser => get(loggedInUser, 'loggedInUser', null);

export const LoggedInUserContext = React.createContext(createLoggedInUser(null));

export const useLoggedInUserContext = () => {
  return React.useContext(LoggedInUserContext);
}