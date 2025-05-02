import axios from "axios";
import { useEffect, useState } from "react";
import FavoriteRestaurantListItems from "../../components/FavoriteRestaurantListItems";

function FavoritesPage() {
  const [favoriteRestaurants, setFavoriteRestaurants] = useState([]);

  useEffect(() => {
    axios
      .get("/api/favorites")
      .then((res) => setFavoriteRestaurants(res.data))
      .catch((err) => console.error(err));
  }, []);

  return (
    <div>
      <h1>Favorites</h1>
      <FavoriteRestaurantListItems favoriteRestaurants={favoriteRestaurants} />
    </div>
  );
}

export default FavoritesPage;
