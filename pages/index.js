import React from 'react';
import Link from 'next/link';
import Router from 'next/router';
import requireLogin from '../components/requireLogin';
import Login from '../components/login';
import logoutHandler from '../utils/logoutHandler';
import { useLoggedInUserContext } from '../hooks/useLoggedInUserContext';

const Index = () => {
  const { loggedInUser: AuthUser } = useLoggedInUserContext();

  return (
    <div>
      {!AuthUser ? (
        <Login />
      ) : (
        <div>
          <p>You're signed in. Email: {AuthUser.email}</p>
          <p
            style={{
              display: 'inlinelock',
              color: 'blue',
              textDecoration: 'underline',
              cursor: 'pointer',
            }}
            onClick={async () => {
              try {
                await logoutHandler()
                Router.push('/')
              } catch (e) {
                console.error(e)
              }
            }}
          >
            Log out
          </p>
        </div>
      )}
    </div>
  )
}

Index.displayName = 'Index'

export default requireLogin(Index);
