import { colors } from '../src/theme';
import * as actions from '../src/constants/actions';
import { ReducerContext } from '../src/hooks/useCustomReducer';

const initialState = {
  orders: [],
};

const orderReducer = (state, action) => {
  switch (action.type) {
    case actions.FETCH_ORDERS: 
      const newOrders = Object.assign({}, state.orders, action.orders);
      return Object.assign({}, state, { orders: newOrders });
    default: return state;
  }
}

export default function App({ Component, pageProps }) {
  const [state, dispatch] = React.useReducer(orderReducer, initialState);

  return (
    <>
      <ReducerContext.Provider value={{ state, dispatch }} >
        <Component {...pageProps} />
      </ReducerContext.Provider>

      <style jsx global>{`
        html {
          margin: 0;
          padding: 0;
          height: 100%;
        }

        body {
          margin: 0;
          padding: 0;
          min-height: 100%;
          background: ${colors.background};
          color: ${colors.text};
          font-family: 'Nunito', sans-serif;
        }

      `}</style>
    </>
  );
}