import axios from "axios";
import { useState, useEffect } from "react";

export default function useFavorites(currentUser) {
  const [favoriteIds, setFavoriteIds] = useState([]);
  const [favoritesLoaded, setFavoritesLoaded] = useState(false);

  // Fetch user's favorite restaurant ids
  useEffect(() => {
    if (!currentUser?.id) return;

    axios
      .get("/api/favorites")
      .then((res) => {
        if (res.length === 0) return;
        const favRestaurantIds = res.data.map((fav) => fav.id);
        setFavoriteIds(favRestaurantIds);
      })
      .catch((err) => console.error("Error fetching favorites:", err))
      .finally(() => setFavoritesLoaded(true));
  }, [currentUser]);

  // toggle favorite
  const toggleFavorite = async (restaurant_id) => {
    if (!currentUser) {
      alert("Please log in to like this restaurant");
      return;
    }

    if (!favoritesLoaded) {
      alert("Favorites are still loading. Please wait.");
      return;
    }

    try {
      if (!favoriteIds.includes(restaurant_id)) {
        // POST /api/favorites
        await axios.post("/api/favorites", {
          restaurant_id,
        });

        setFavoriteIds((prev) => [...prev, restaurant_id]);
      } else {
        // DELETE /api/favorites/:restaurant_id
        await axios.delete(`/api/favorites/${restaurant_id}`);
        setFavoriteIds((prev) => prev.filter((id) => id !== restaurant_id));
      }
    } catch (err) {
      console.error("Error toggling favorite:", err);
    }
  };

  return {
    favoriteIds,
    toggleFavorite,
  };
}
