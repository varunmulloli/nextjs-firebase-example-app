import React from 'react';

import requireLogin from '../src/components/requireLogin';
import Header from '../src/components/header';
import Login from '../src/components/login';
import Orders from '../src/components/orders';
import { useLoggedInUserContext } from '../src/hooks/useLoggedInUserContext';

const Index = () => {
  const { loggedInUser } = useLoggedInUserContext();  
  
  return (
    <>
      <Header loggedInUser={loggedInUser} />

      { !loggedInUser && <Login /> }
      
      { loggedInUser && <Orders /> }
    </>
  )
}

export default requireLogin(Index);
