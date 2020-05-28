import { firestore } from '../firebase/firebaseSDK';

export const fetchAllOrders = () => {
  try {
    return firestore.collection("orders").get().then(function(querySnapshot) {
      let orders = {};
      querySnapshot.forEach(function(doc) { 
        orders[doc.id] = doc.data();
      });
      return orders;
    });
  } catch(e) {
    console.error(e);
    return Promise.resolve({});
  }
} 

export const fetchOrder = (orderId) => {
  if(!orderId) {
    return Promise.resolve({});
  }

  try {
    return firestore.collection("orders").doc(orderId).get().then(function(doc) {
      if(doc.exists) {
        return { [orderId]: doc.data() };
      } else {
        return {};
      }
    });
  } catch(e) {
    console.error(e);
    return Promise.resolve({});
  }
} 

export const updateOrder = (orderId, title, bookingDate) => {
  return fetch(`/api/orders/${orderId}`, {
    method: 'PUT',
    credentials: 'same-origin',
    body: JSON.stringify({ title, bookingDate }),
    headers: new Headers({ 'Content-Type': 'application/json' })
  });
}