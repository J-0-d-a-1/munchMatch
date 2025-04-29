import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";

function DishesList() {
  const { id } = useParams(); // restaurant ID from the URL
  const [dishes, setDishes] = useState([]);

  useEffect(() => {
    axios
      .get(`/api/restaurants/7/dishes`) // now dynamic!
      .then((res) => setDishes(res.data))
      .catch((err) => console.error(err));
  }, [id]);

  // Format price
  const formatPrice = (priceInCents) => {
    return `$${(priceInCents / 100).toFixed(2)} CAD`;
  };

  // Map dishes
  const parsedDishes = dishes.map((dish) => (
    <div key={dish.id}>
      <h2>{dish.name}</h2>
      <img src={dish.photo_url} alt={dish.name} />
      <p>{dish.description}</p>
      <p>{formatPrice(dish.price_in_cents)}</p>
    </div>
  ));

  return <div>{parsedDishes}</div>;
}

export default DishesList;
