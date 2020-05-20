import { get } from 'lodash/object';

export const getUserEmail = loggedInUser => {
  return get(loggedInUser, 'email', "?");
}