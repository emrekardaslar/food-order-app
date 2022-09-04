import React, { useEffect, useState } from "react";
import Cart from "../components/Cart/Cart";
import Header from "../components/Layout/Header";
import Orders from "../components/Orders/Orders";
import Pagination from "../components/UI/Pagination";
import { auth, db } from "../services/firebase";

function OrdersPage() {
  const [orders, setOrders] = useState({});
  const userId = auth.currentUser.uid;
  const [currentPage, setCurrentPage] = useState(1);
  const [cartIsShown, setCartIsShown] = useState(false);
  let pageLength = 3;

  const showCartHandler = () => {
    setCartIsShown(true);
  };

  const hideCartHandler = () => {
    setCartIsShown(false);
  };

  const paginate = pageNum => setCurrentPage(pageNum)

  const nextPage = () => setCurrentPage(currentPage + 1)

  const prevPage = () => setCurrentPage(currentPage - 1)

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
            {( (currentPage - 1) * pageLength <= key && key < currentPage * pageLength) && <Orders orders={orders[key]}/>}
            <br></br>
          </>
        ))}
      </ul>
      {orders.length > 0 &&  <Pagination postsPerPage={pageLength} totalLength={orders.length}  paginate={paginate} nextPage={nextPage} prevPage={prevPage} currentPage={currentPage} ></Pagination>}
      {orders.length === 0 && <h4 style={{marginLeft: "2rem"}}>You order history is empty</h4>}
    </>
  );
}

export default OrdersPage;
