import React, { useEffect, useState } from "react";
import Cart from "../components/Cart/Cart";
import Header from "../components/Layout/Header";
import Orders from "../components/Orders/Orders";
import { auth, db } from "../services/firebase";

function OrdersPage() {
  const [orders, setOrders] = useState({});
  const userId = auth.currentUser.uid;

  const [cartIsShown, setCartIsShown] = useState(false);

  const showCartHandler = () => {
    setCartIsShown(true);
  };

  const hideCartHandler = () => {
    setCartIsShown(false);
  };

  useEffect(() => {
    let currentOrders = [];
    const query = db.ref("orders/" + userId).orderByChild("date");
    query.once("value").then((orders) => {
      orders.forEach(order=> {
        currentOrders.push(order.val())
      })
    })
    .finally(() => {
      currentOrders = currentOrders.reverse()
      setOrders(currentOrders);
    })
  }, [userId]);

  return (
    <>
      {cartIsShown && <Cart onClose={hideCartHandler} />}
      <Header onShowCart={showCartHandler}/>
      <h1 style={{marginLeft: "2rem"}}>My Orders</h1>
      <ul>
        {Object.keys(orders).map((key) => (
          <>
            <Orders orders={orders[key]}/>
            <br></br>
          </>
        ))}
      </ul>
    </>
  );
}

export default OrdersPage;
