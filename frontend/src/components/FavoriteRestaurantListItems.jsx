import { Button, Card } from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";

function FavoriteRestaurantListItems(props) {
  const { favoriteRestaurants } = props;

  const navigation = useNavigate();

  const handleMenuList = (restaurant_id) => {
    navigation(`/restaurants/${restaurant_id}`);
  };

  return (
    <div>
      {favoriteRestaurants.length <= 0 && (
        <>
          <Link to="/">Keep Munching?</Link>
        </>
      )}
      {favoriteRestaurants.length > 0 &&
        favoriteRestaurants.map((favoriteRestaurant) => {
          return (
            <Card style={{ width: "18rem" }} key={favoriteRestaurant.id}>
              <Card.Img variant="top" src={favoriteRestaurant.logo_url} />
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
