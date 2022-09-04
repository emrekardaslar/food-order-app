import { Fragment, useState } from 'react';

import HeaderCartButton from './HeaderCartButton';
import mealsImage from '../../assets/meals.jpg';
import classes from './Header.module.css';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../store/auth-context';
import { Button, Alert } from "react-bootstrap"

const Header = (props) => {
  const [error, setError] = useState("")
  const { currentUser, logout } = useAuth()
  const navigate = useNavigate()

  async function handleLogout() {
    setError("")
  
    try {
      await logout()
      navigate("/login")
    } catch {
      setError("Failed to log out")
    }
  }

  function navigateToOrders() {
    navigate("/orders")
  }

  function navigateToMain() {
    navigate("/")
  }

  return (
    <Fragment>
      {error && <Alert variant="danger">{error}</Alert>}
      <header className={classes.header}>
        <h1 type="button" onClick={navigateToMain}>MealOrder</h1>
        <HeaderCartButton onClick={props.onShowCart}/>
        {currentUser.email}
        <Button className={classes.btn} variant="secondary" onClick={navigateToOrders}>My Orders</Button>
        <Button className={classes.btn} variant="secondary" onClick={handleLogout}>Logout</Button>
      </header>      
      <div className={classes['main-image']}>
        <img src={mealsImage} alt='A table full of delicious food!' />
      </div>
    </Fragment>
  );
};

export default Header;