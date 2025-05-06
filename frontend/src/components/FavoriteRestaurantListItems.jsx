import { Button, Card, Stack } from "react-bootstrap";
import { useNavigate } from "react-router-dom";

import "../../styles/dishcard.scss";
import "../../styles/restaurantcard.scss";
import useFavorites from "../hooks/useFavorites";

function FavoriteRestaurantListItems(props) {
  const { currentUser, favoriteRestaurants } = props;

  const { favoriteIds, toggleFavorite } = useFavorites(currentUser);

  const navigation = useNavigate();

  const isFavorite = (id) => {
    return favoriteIds.includes(id);
  };

  const handleMenuList = (restaurant_id) => {
    navigation(`/restaurants/${restaurant_id}`);
  };

  const handleHomepage = () => {
    navigation("/");
  };

  return (
    <div className="card-container restaurant-card">
      {favoriteRestaurants.length <= 0 && (
        <div style={{ marginBottom: "0" }}>
          <h3 className="sub-title">No liked restaurants yet...</h3>
          <div className="img-container">
            <Button variant="primary" onClick={() => handleHomepage()}>
              Keep Munching?
            </Button>
          </div>
        </div>
      )}
      {favoriteRestaurants.length > 0 &&
        favoriteRestaurants.map((favoriteRestaurant) => {
          return (
            <Card key={favoriteRestaurant.id} className="fav-card">
              <Card.Img
                variant="top"
                src={favoriteRestaurant.logo_url}
                style={{ maxHeight: "10rem" }}
              />
              <Card.Body>
                <Card.Title>{favoriteRestaurant.name}</Card.Title>
                <Card.Text>{favoriteRestaurant.description}</Card.Text>
                <Stack direction="horizontal" gap={5}>
                  <Button
                    variant={
                      isFavorite(favoriteRestaurant.id)
                        ? "success"
                        : "outline-success"
                    }
                    style={{ marginLeft: "0.6rem" }}
                    onClick={() => {
                      toggleFavorite(favoriteRestaurant.id);
                    }}
                    onTouchEnd={(e) => e.target.blur()}
                    onMouseUp={(e) => e.target.blur()}
                  >
                    {isFavorite(favoriteRestaurant.id) ? "Liked" : "Like"}
                  </Button>
                  <Button
                    variant="primary"
                    onClick={() => handleMenuList(favoriteRestaurant.id)}
                  >
                    See menu
                  </Button>
                </Stack>
              </Card.Body>
            </Card>
          );
        })}
    </div>
  );
}

export default FavoriteRestaurantListItems;
