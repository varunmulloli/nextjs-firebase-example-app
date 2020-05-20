import React from 'react';
import { get, set } from 'lodash/object';
import useAuth from '../hooks/useAuth';
import { LoggedInUserContext, createLoggedInUser } from '../hooks/useLoggedInUserContext';

export default ComposedComponent => {
  const WrapperComponent = props => {
    const { loggedInUser: loggedInUserFromServer, ...otherProps } = props;

    const { user } = useAuth();
    const loggedInUserFromClient = user ? createLoggedInUser(user) : null;
    const loggedInUser = loggedInUserFromClient || loggedInUserFromServer || null;

    return (
      <LoggedInUserContext.Provider value={loggedInUser}>
        <ComposedComponent {...otherProps} />
      </LoggedInUserContext.Provider>
    );
  }

  WrapperComponent.getInitialProps = async ctx => {
    const { req, res } = ctx;
    let loggedInUser;

    if (typeof window === 'undefined') {
      const { addSession } = require('../middlewares/cookieMiddleware');
      addSession(req, res);
      let user = get(req, 'session.user', null);
      loggedInUser = createLoggedInUser(user);
    } else {
      try {
        const jsonData = JSON.parse(window.document.getElementById('__LOGGED_IN_USER').textContent);
        loggedInUser = jsonData ? jsonData : createLoggedInUser(null);
      } catch (e) {
        loggedInUser = createLoggedInUser(null);
      }
    }

    //TODO: Remove this later
    set(ctx, 'customData.loggedInUser', loggedInUser)

    let composedInitialProps = {}
    if (ComposedComponent.getInitialProps) {
      composedInitialProps = await ComposedComponent.getInitialProps(ctx);
    }

    return {
      ...composedInitialProps,
      loggedInUser,
    };
  }

  WrapperComponent.displayName = `RequireLogin(${ComposedComponent.displayName})`

  WrapperComponent.defaultProps = { 
    loggedInUser: createLoggedInUser(null),
  }

  return WrapperComponent;
}
