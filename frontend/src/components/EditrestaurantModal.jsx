import axios from "axios";
import { useState, useEffect } from "react";
import { Modal, Button, Form } from "react-bootstrap";

const EditRestaurantModal = ({
  categories,
  show,
  onHide,
  restaurant,
  onUpdateRestaurant,
  onUpdateDish,
  onAddDish,
  onDeleteDish,
}) => {
  const [restaurantForm, setRestaurantForm] = useState({
    name: restaurant.name,
    description: restaurant.description,
    location: restaurant.location,
    category_id: restaurant.category_id,
    logo: null,
  });

  const [dishes, setDishes] = useState([]);
  const [newDishForm, setNewDishForm] = useState({
    name: "",
    description: "",
    price: "",
    photo: null,
  });
  const [showAddDishForm, setShowAddDishForm] = useState(false);

  useEffect(() => {
    const fetchDishes = async () => {
      if (!restaurant?.id) return;
      try {
        const response = await axios.get(
          `/api/restaurants/${restaurant.id}/dishes`
        );
        setDishes(response.data);
      } catch (error) {
        console.error("Failed to fetch dishes:", error);
      }
    };

    fetchDishes();
  }, [restaurant]);

  const handleRestaurantChange = (event) => {
    const { name, value, files } = event.target;
    setRestaurantForm((prev) => ({
      ...prev,
      [name]: files ? files[0] : value,
    }));
  };

  const handleDishChange = (index, event) => {
    const { name, value, files } = event.target;
    const updatedDishes = [...dishes];
    updatedDishes[index] = {
      ...updatedDishes[index],
      [name]: files ? files[0] : value,
    };
    setDishes(updatedDishes);
  };

  const handleNewDishChange = (e) => {
    const { name, value, type, files } = e.target;
    setNewDishForm((prev) => ({
      ...prev,
      [name]: type === "file" ? files[0] : value,
    }));
  };

  const submitRestaurantForm = () => {
    const formData = new FormData();
    Object.entries(restaurantForm).forEach(([key, value]) => {
      if (value) formData.append(key, value);
    });
    onUpdateRestaurant(restaurant.id, formData);
  };

  const submitDishForm = (dish) => {
    const formData = new FormData();
    Object.entries(dish).forEach(([key, value]) => {
      if (value) formData.append(key, value);
    });
    onUpdateDish(dish.id, formData);
  };

  const submitNewDish = () => {
    const formData = new FormData();
    Object.entries(newDishForm).forEach(([key, value]) => {
      if (value) formData.append(`dish[${key}]`, value);
    });
    formData.append("dish[restaurant_id]", restaurant.id);
    onAddDish(restaurant.id, formData);
    setNewDishForm({ name: "", description: "", price: "", photo: null });
    setShowAddDishForm(false);
  };

  const handleDeleteDish = (dishId) => {
    onDeleteDish(dishId);
    setDishes((prev) => prev.filter((d) => d.id !== dishId));
  };

  const parsedCategories = categories.map((category) => (
    <option key={category.id} value={category.id}>
      {category.name}
    </option>
  ));

  return (
    <Modal show={show} onHide={onHide} size="lg">
      <Modal.Header closeButton>
        <Modal.Title>Edit Restaurant</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        {/* Restaurant Edit Form */}
        <h5>Edit Restaurant Info</h5>
        <Form>
          <Form.Group>
            <Form.Label>Name</Form.Label>
            <Form.Control
              name="name"
              value={restaurantForm.name}
              onChange={handleRestaurantChange}
            />
          </Form.Group>
          <Form.Group>
            <Form.Label>Description</Form.Label>
            <Form.Control
              name="description"
              value={restaurantForm.description}
              onChange={handleRestaurantChange}
            />
          </Form.Group>
          <Form.Group>
            <Form.Label>Location</Form.Label>
            <Form.Control
              name="location"
              value={restaurantForm.location}
              onChange={handleRestaurantChange}
            />
          </Form.Group>
          <Form.Group>
            <Form.Label>Category</Form.Label>
            <Form.Select
              name="category_id"
              value={restaurantForm.category_id}
              onChange={handleRestaurantChange}
              required
            >
              <option value="">Select a category</option>
              {categories.map((category) => (
                <option key={category.id} value={category.id}>
                  {category.name}
                </option>
              ))}
            </Form.Select>
          </Form.Group>

          <Form.Group>
            <Form.Label>Logo</Form.Label>
            <Form.Control
              type="file"
              name="logo"
              onChange={handleRestaurantChange}
            />
          </Form.Group>
          <Button onClick={submitRestaurantForm} className="mt-2">
            Save Restaurant
          </Button>
        </Form>

        <hr />

        {/* Edit Existing Dishes */}
        <h5>Edit Dishes</h5>
        {dishes.map((dish, index) => (
          <Form key={dish.id} className="mb-3">
            <Form.Group>
              <Form.Label>Dish Name</Form.Label>
              <Form.Control
                name="name"
                value={dish.name}
                onChange={(e) => handleDishChange(index, e)}
              />
            </Form.Group>
            <Form.Group>
              <Form.Label>Description</Form.Label>
              <Form.Control
                name="description"
                value={dish.description}
                onChange={(e) => handleDishChange(index, e)}
              />
            </Form.Group>
            <Form.Group>
              <Form.Label>Price</Form.Label>
              <Form.Control
                type="number"
                step="0.01"
                name="price"
                required
                value={dish.price}
                onChange={(e) => handleDishChange(index, e)}
              />
            </Form.Group>
            <Form.Group>
              <Form.Label>Photo</Form.Label>
              <Form.Control
                type="file"
                name="photo"
                onChange={(e) => handleDishChange(index, e)}
              />
            </Form.Group>
            <div className="d-flex gap-2 mt-2">
              <Button variant="primary" onClick={() => submitDishForm(dish)}>
                Save Dish
              </Button>
              <Button
                variant="danger"
                onClick={() => handleDeleteDish(dish.id)}
              >
                Delete Dish
              </Button>
            </div>
          </Form>
        ))}

        <hr />

        <h5>Add New Dish</h5>
        <Button
          variant="success"
          onClick={() => setShowAddDishForm((prev) => !prev)}
        >
          {showAddDishForm ? "Cancel" : "Add Dish"}
        </Button>

        {showAddDishForm && (
          <Form className="mt-3">
            <Form.Group>
              <Form.Label>Name</Form.Label>
              <Form.Control
                name="name"
                value={newDishForm.name}
                onChange={handleNewDishChange}
              />
            </Form.Group>
            <Form.Group>
              <Form.Label>Description</Form.Label>
              <Form.Control
                name="description"
                value={newDishForm.description}
                onChange={handleNewDishChange}
              />
            </Form.Group>
            <Form.Group>
              <Form.Label>Price</Form.Label>
              <Form.Control
                type="number"
                step="0.01"
                name="price"
                value={newDishForm.price}
                onChange={handleNewDishChange}
              />
            </Form.Group>
            <Form.Group>
              <Form.Label>Photo</Form.Label>
              <Form.Control
                type="file"
                name="photo"
                onChange={handleNewDishChange}
              />
            </Form.Group>
            <Button className="mt-2" onClick={submitNewDish}>
              Submit Dish
            </Button>
          </Form>
        )}
      </Modal.Body>
    </Modal>
  );
};

export default EditRestaurantModal;
