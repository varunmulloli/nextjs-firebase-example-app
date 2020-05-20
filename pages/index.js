import React from 'react';

import requireLogin from '../src/components/requireLogin';
import Header from '../src/components/header';
import Login from '../src/components/login';

import { useLoggedInUserContext } from '../src/hooks/useLoggedInUserContext';

const Index = () => {
  const { loggedInUser: AuthUser } = useLoggedInUserContext();

  return (
    <div>
      <Header loggedInUser={AuthUser} />

      {!AuthUser ? (
        <Login />
      ) : (
        <div>
          <p>You're signed in. Email: {AuthUser.email}</p>
        </div>
      )}
    </div>
  )
}

export default requireLogin(Index);
