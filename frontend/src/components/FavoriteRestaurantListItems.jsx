import { Button, Card } from "react-bootstrap";
import { useNavigate } from "react-router-dom";

import "../../styles/dishcard.scss";
import "../../styles/restaurantcard.scss";

function FavoriteRestaurantListItems(props) {
  const { favoriteRestaurants } = props;

  const navigation = useNavigate();

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
                <Button
                  variant="primary"
                  onClick={() => handleMenuList(favoriteRestaurant.id)}
                >
                  See menu
                </Button>
              </Card.Body>
            </Card>
          );
        })}
    </div>
  );
}

export default FavoriteRestaurantListItems;
