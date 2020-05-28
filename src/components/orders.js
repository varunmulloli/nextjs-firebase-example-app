import React from 'react';
import Link from 'next/link';
import { get } from 'lodash';
import { FETCH_ORDERS } from '../constants/actions';
import { useCustomReducer } from '../hooks/useCustomReducer';
import { fetchAllOrders } from '../handlers/orderHandler'; 
import { getReadableDate } from '../handlers/dateHandler';
import * as theme from '../theme';

const Orders = () => {
  const { state, dispatch } = useCustomReducer();

  React.useEffect(() => {
    fetchAllOrders()
      .then(orders => dispatch({ type: FETCH_ORDERS, orders: orders }));
  }, []);

  return (
    <>
      <div className="container">
        <h1>Orders Overview</h1>

        <table>
          <thead>
            <tr className="titleRow">
              <th>Title</th>
              <th>Booking Date</th>
              <th>Address</th>
              <th>Customer</th>
            </tr>
          </thead>

          <tbody>
            { state && state.orders && Object.keys(state.orders).map(orderId => {
              const order = state.orders[orderId];
              const title = get(order, 'title', "");
              const timestamp = get(order, 'bookingDate', null);
              const bookingDate = timestamp ? getReadableDate(timestamp) : "";
              
              return (
                <tr key={orderId}>
                  <td>
                    <Link href="/order/[orderId]" as={`/order/${orderId}`}>
                      <span title={`Open ${title}`}>{title}</span>
                    </Link>
                  </td>
                  <td>{bookingDate}</td>
                  <td>{get(order, 'address.street', "")}</td>
                  <td>{get(order, 'customer.name', "")}</td>
                </tr>
              );
            })}
          </tbody>
        </table>
        
      </div>

      <style jsx>{`
        .container {
          width: 800px;
          margin: ${theme.margin4x} auto;
          background: ${theme.colors.foreground};
          padding: ${theme.margin2x};
        }

        table {
          width: 100%;
          border-collapse: collapse;
          border-spacing: 0;
        }

        tr {
          height: ${theme.margin2x};
        }

        tr:nth-child(even) {
          background: ${theme.colors.background};
        }

        .titleRow {
          height: 48px;
        }

        th {
          text-align: left;
          font-weight: bold;
        }

        th:first-child, td:first-child {
          padding: ${theme.margin1x} ${theme.padding1x};
        }

        span {
          color: blue;
          text-decoration: underline;
          cursor: pointer;
          font-weight: bold;
        }
        
      `}</style>
    </>
  );
}

export default Orders;