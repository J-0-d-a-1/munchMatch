import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";
import "../../../styles/dish.scss";
import "../../../styles/menu.scss";

function DishesList({ restaurant, setRestaurant }) {
  const { restaurant_id } = useParams(); // restaurant ID from the URL
  const [dishes, setDishes] = useState([]);

  useEffect(() => {
    axios.get(`/api/restaurants/${restaurant_id}`).then((res) => {
      setRestaurant(res.data);
    });
  }, []);

  useEffect(() => {
    axios
      .get(`/api/restaurants/${restaurant_id}/dishes`)
      .then((res) => setDishes(res.data))
      .catch((err) => console.error(err));
  }, [restaurant_id]);

  // Format price
  const formatPrice = (priceInCents) => {
    return `$${(priceInCents / 100).toFixed(2)} CAD`;
  };

  // Map dishes
  const parsedDishes = dishes.map((dish) => (
    <div key={dish.id} className="dish-list__item">
      <h2>{dish.name}</h2>
      <img className="dish-list__image" src={dish.photo_url} alt={dish.name} />
      <div className="dish__dedescription">
        <p>{dish.description}</p>
        <div className="photo-list__dish-price">
          <span>{formatPrice(dish.price_in_cents)}</span>
        </div>
      </div>
    </div>
  ));

  return (
    <>
      {restaurant && (
        <section className="restaurant-info">
          <header>
            {restaurant.logo_url && (
              <img
                className="restaurant__logo"
                src={restaurant.logo_url}
                alt={`${restaurant.name} logo`}
              />
            )}
            <h2>{restaurant.name}</h2>
          </header>

          <p>{restaurant.description}</p>
        </section>
      )}

      <main>{parsedDishes}</main>
    </>
  );
}

export default DishesList;
