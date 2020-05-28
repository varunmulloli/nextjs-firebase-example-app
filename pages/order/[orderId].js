import React from 'react';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { get } from 'lodash';
import Header from '../../src/components/header';
import requireLogin from '../../src/components/requireLogin';
import { useCustomReducer } from '../../src/hooks/useCustomReducer';
import { useLoggedInUserContext } from '../../src/hooks/useLoggedInUserContext';
import { fetchOrder } from '../../src/handlers/orderHandler';
import { FETCH_ALL_ORDERS } from '../../src/constants/actions';
import { getReadableDate, getDateForInput } from '../../src/handlers/dateHandler';
import * as theme from '../../src/theme';

const OrderDetails = () => {
  const router = useRouter();
  const { orderId } = router.query;

  const { state, dispatch } = useCustomReducer();
  const { loggedInUser } = useLoggedInUserContext();  

  const [editMode, setEditMode] = React.useState(false);

  const orderDetails = get(state, `orders.${orderId}`, null);
  const title = get(orderDetails, "title", "");
  const timestamp = get(orderDetails, "bookingDate", null);

  const [newTitle, setNewTitle] = React.useState(title);
  const [newBookingDate, setNewBookingDate] = React.useState(timestamp);

  React.useEffect(() => {
    if(orderId && !orderDetails) {
      fetchOrder(orderId)
        .then(orders => dispatch({ type: FETCH_ALL_ORDERS, orders: orders }));
    }
  }, [orderId]);

  const handleEdit = () => {
    setNewTitle(title);
    setNewBookingDate(timestamp);
    setEditMode(!editMode);
  }

  const handleSave = () => {
    fetch(`/api/orders/${orderId}`, {
      method: 'PUT',
      credentials: 'same-origin',
      body: JSON.stringify({ title: newTitle, bookingDate: newBookingDate }),
      headers: new Headers({ 'Content-Type': 'application/json' }),
    }).then(response => setEditMode(false));
  }

  const bookingDate = timestamp ? getReadableDate(timestamp) : "";
  const address = get(orderDetails, "address", null);
  const customer = get(orderDetails, "customer", null);

  return (
    <>
     <Header loggedInUser={loggedInUser} />

      <div className="back">
        <Link href="/">
          <a>&laquo; Back to Orders Overview</a>
        </Link>
      </div>
      <div className="container">
        <div className="title">
          <h1>Order Details</h1>
          { !editMode && <button  onClick={handleEdit}>Edit</button> }
          { editMode && <button onClick={handleSave}>Save</button> }
          { editMode && <button onClick={e => setEditMode(false)}>Cancel</button> }
        </div>
        
        <div className="row">
          <div className="label">Title</div>
          <div>
            { editMode && <input type="text" value={newTitle} onChange={e => setNewTitle(e.target.value) }/> }
            { !editMode && title }
          </div>
        </div>

        <div className="row">
          <div className="label">Booking Date</div>
          <div>
            { editMode && <input type="date" value={getDateForInput(newBookingDate)} onChange={e => setNewBookingDate(e.target.valueAsNumber) }/> }
            { !editMode && bookingDate }
          </div>
        </div>

        <div className="row">
          <div className="label">Address</div>
          <div>
            <div>{get(address, "street", "")}</div>
            <div>{`${get(address, "city", "")} ${get(address, "zip", "")}`}</div>
            <div>{get(address, "country", "")}</div>
          </div>
          
        </div>

        <div className="row">
          <div className="label">Customer</div>
          <div>
            <div>{get(customer, "name", "")}</div>
            <div>{get(customer, "email", "")}</div>
            <div>{get(customer, "phone", "")}</div>
          </div>
        </div>

        
      </div>

      <style jsx>{`
        .back {
          margin: ${theme.margin2x} auto ${theme.margin1x};
          width: 800px;
          cursor: pointer;
          text-decoration: underline;
          color: blue;
        }

        .container {
          width: 800px;
          box-sizing: border-box;
          margin: 0 auto ${theme.margin4x};
          background: ${theme.colors.foreground};
          padding: ${theme.margin2x};
        }

        .title {
          display: flex;
        }

        button {
          height: fit-content;
          margin: auto 0 auto ${theme.margin1x};
        }

        .row {
          display: flex;
          margin-bottom: ${theme.margin2x};
        }

        .label {
          width: 150px;
          font-weight: bold;
        }
      `}</style>
    </>
  );
}

export default requireLogin(OrderDetails); 