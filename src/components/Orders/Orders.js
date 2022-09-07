import moment from 'moment/moment';
import React from 'react'
import Card from '../UI/Card';

function Orders({ orders }) {

  const calculateTotalPrice = (items) => {
    let totalPrice = 0;
    items.forEach(item => {
        totalPrice += item.amount * item.price
    })
    return totalPrice
  }

  const tsToDate = (ts) => {
    const dateTimeString = moment(ts).format("MM/DD/YYYY HH:mm:ss");
    return dateTimeString;
  }

  return (
    <Card>
      <p>Date: {tsToDate(orders.date)}</p>

      {orders.orderedItems.map(item => (
        <>
            <p>Amount: {item.amount} </p>
            <p>Name: {item.name} </p>
            <p>Price: ${item.price} </p>
        </>
      ))}

      <p>Total Price: ${calculateTotalPrice(orders.orderedItems).toFixed(2)}</p>

      <p>City: {orders.user.city}</p>
      <p>Postal Code: {orders.user.postalCode}</p>
      <p>Street: {orders.user.street}</p>
      <p>Order Status: {orders.isDelivered ? 'Delivered' : 'Not Delivered'}</p>
    </Card>
  )
}

export default Orders
