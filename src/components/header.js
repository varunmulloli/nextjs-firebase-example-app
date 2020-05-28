import React from 'react';
import Router from 'next/router';
import { useRouter } from 'next/router'
import { getUserEmail } from '../handlers/loggedInUserHandler';
import logoutHandler from '../handlers/logoutHandler';
import * as theme from '../theme';

const signInURL = "/";

const activeNavItem = (router, href) => {
  return router.pathname === href ? "active" : "";
}

const signOut = async () => {
  try {
    await logoutHandler();
    Router.push('/');
  } catch (e) {
    console.error(e);
  }
};

const Header = ({ loggedInUser }) => {
  const router = useRouter();

  return (
    <>
      <div className="headerContainer">
        <img src="/logo.png" alt="Home" title="Go to Homepage" className="headerLogo" />

        <div className="spacer"></div>
         
        { !loggedInUser &&
          <div onClick={e => Router.push(signInURL)} className={`navItem button ${activeNavItem(router, signInURL)}`} title="Go to Login page">
            Sign In
          </div>
        }

        { loggedInUser &&
          <>
            <div className="navItem">{getUserEmail(loggedInUser)}</div>
            <div onClick={e => signOut()} className="navItem button" title="Logout">Sign Out</div>
          </>
        }
      </div>

      <style jsx>{`
        .headerContainer {
          display: flex;
          height: ${theme.headerHeight}px;
          line-height: ${theme.headerHeight}px;
          background: ${theme.colors.foreground};
          box-shadow: 0px 1px 10px ${theme.colors.dropshadow};
          margin-bottom: ${theme.margin2x};
        }

        .headerLogo {
          height: ${theme.headerHeight - theme.marginWidth}px;
          margin: auto ${theme.padding1x};
          cursor: pointer;
        }

        .spacer {
          flex-grow: 1;
        }
        
        .navItem {
          padding: 0 ${theme.margin1x};
        }

        .navItem.button {
          cursor: pointer;
        }

        .navItem.button:hover, .navItem.button.active {
          background: ${theme.colors.hover};
          color: ${theme.colors.textInvert};
        }
      `}</style>
    </>
  );
};

export default Header;