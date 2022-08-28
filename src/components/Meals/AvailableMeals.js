import classes from "./AvailableMeals.module.css";
import Card from "../UI/Card";
import MealItem from "./MealItem/MealItem";
import { useEffect, useState } from "react";

/* const DUMMY_MEALS = [
  {
    id: "m1",
    name: "Sushi",
    description: "Finest fish and veggies",
    price: 22.99,
  },
  {
    id: "m2",
    name: "Schnitzel",
    description: "A german specialty!",
    price: 16.5,
  },
  {
    id: "m3",
    name: "Barbecue Burger",
    description: "American, raw, meaty",
    price: 12.99,
  },
  {
    id: "m4",
    name: "Green Bowl",
    description: "Healthy...and green...",
    price: 18.99,
  },
]; */

const AvailableMeals = () => {
  const [meals, setMeals] = useState([]);

  useEffect(()=>{
    const fetchMeals = async () => {
      const response = await fetch(process.env.REACT_APP_FIREBASE_URL)
      const responseData = await response.json();
      const loadedMeals = [];

      Object.keys(responseData).forEach(meal => {
        loadedMeals.push({
          id: meal,
          name: responseData[meal].name,
          description: responseData[meal].description,
          price: responseData[meal].price
        })
      })
      setMeals(loadedMeals);
    };

    fetchMeals();
  }, [])

  return (
    <section className={classes.meals}>
      <Card>
        <ul>
          {meals.map((meal) => (
            <MealItem
              id={meal.id}
              key={meal.id}
              name={meal.name}
              description={meal.description}
              price={meal.price}
            />
          ))}
        </ul>
      </Card>
    </section>
  );
};

export default AvailableMeals;
