import axios from "axios";
import { useState, useEffect } from "react";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import InputGroup from "react-bootstrap/InputGroup";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Modal from "react-bootstrap/Modal";

function EditRestaurantModal({
  show,
  onHide,
  restaurantIdToEdit,
  categories,
  onRestaurantUpdated,
  onDishesUpdated,
}) {
  const [validated, setValidated] = useState(false);
  const [restaurantData, setRestaurantData] = useState({
    name: "",
    description: "",
    address: "",
    city: "",
    province: "",
    country: "",
    postalCode: "",
    category: null,
    logo: null,
  });
  const [dishes, setDishes] = useState([]);
  const [savingRestaurant, setSavingRestaurant] = useState(false);
  const [savingDishes, setSavingDishes] = useState(false);
  const [restaurantSaveError, setRestaurantSaveError] = useState(null);
  const [dishesSaveError, setDishesSaveError] = useState(null);
  const [newDishAdded, setNewDishAdded] = useState(false);

  const parsedCategories = categories.map((category) => (
    <option key={category.id} value={category.id}>
      {category.name}
    </option>
  ));

  useEffect(() => {
    const fetchRestaurantData = async () => {
      if (restaurantIdToEdit) {
        try {
          const restaurantResponse = await axios.get(
            `/api/restaurants/${restaurantIdToEdit}`
          );
          const restaurant = restaurantResponse.data;
          const [address, city, province, country, postalCode] =
            restaurant.location.split(", ").map((item) => item.trim());

          setRestaurantData({
            name: restaurant.name || "",
            description: restaurant.description || "",
            address: address || "",
            city: city || "",
            province: province || "",
            country: country || "",
            postalCode: postalCode || "",
            category: restaurant.category_id || null,
            logo: null,
          });

          const dishesResponse = await axios.get(
            `/api/restaurants/${restaurantIdToEdit}/dishes`
          );
          setDishes(
            dishesResponse.data.map((dish) => ({
              ...dish,
              photo: null,
              price: dish.price_in_cents
                ? (dish.price_in_cents / 100).toFixed(2)
                : "", // Convert cents to dollars
            }))
          );
        } catch (error) {
          console.error("Error fetching restaurant data:", error);
        }
      } else {
        // Reset state if no restaurant is provided
        setRestaurantData({
          name: "",
          description: "",
          address: "",
          city: "",
          province: "",
          country: "",
          postalCode: "",
          category: null,
          logo: null,
        });
        setDishes([]);
      }
      setValidated(false); // Reset validation on modal open
      setRestaurantSaveError(null);
      setDishesSaveError(null);
      setNewDishAdded(false);
    };

    fetchRestaurantData();
  }, [restaurantIdToEdit, show]);

  const saveRestaurant = async (event) => {
    event.preventDefault();
    event.stopPropagation();

    const form = event.currentTarget;

    if (form.checkValidity() === false) {
      setValidated(true);
      return;
    }

    setSavingRestaurant(true);
    setRestaurantSaveError(null);

    const fullLocation = `${restaurantData.address}, ${restaurantData.city}, ${restaurantData.province}, ${restaurantData.country}, ${restaurantData.postalCode}`;

    const formData = new FormData();
    formData.append("restaurant[name]", restaurantData.name);
    formData.append("restaurant[description]", restaurantData.description);
    formData.append("restaurant[location]", fullLocation);
    formData.append("restaurant[category_id]", restaurantData.category);
    if (restaurantData.logo) {
      formData.append("restaurant[logo]", restaurantData.logo);
    }

    try {
      const restaurantResponse = await axios.put(
        `/api/restaurants/${restaurantIdToEdit}`,
        formData,
        {
          headers: { "Content-Type": "multipart/form-data" },
        }
      );

      console.log("Restaurant updated successfully:", restaurantResponse);
      if (onRestaurantUpdated) {
        onRestaurantUpdated(restaurantResponse.data);
      }
      onHide(); // Close the modal after successful update
    } catch (error) {
      console.error("Error updating restaurant:", error);
      setRestaurantSaveError("Failed to update restaurant.");
    } finally {
      setSavingRestaurant(false);
    }
  };

  const saveDishes = async () => {
    setSavingDishes(true);
    setDishesSaveError(null);

    try {
      await Promise.all(
        dishes.map(async (dish) => {
          const dishFormData = new FormData();
          dishFormData.append("dish[name]", dish.name);
          dishFormData.append("dish[description]", dish.description);
          const priceInCents = parseFloat(dish.price) * 100;
          dishFormData.append(
            "dish[price_in_cents]",
            isNaN(priceInCents) ? 0 : Math.round(priceInCents)
          ); // Convert to cents here
          if (dish.photo) {
            dishFormData.append("dish[photo]", dish.photo);
          }

          if (dish.id) {
            // Edit existing dish
            await axios.put(`/api/dishes/${dish.id}`, dishFormData, {
              headers: { "Content-Type": "multipart/form-data" },
            });
            console.log(`Dish ${dish.name} updated successfully!`);
          } else {
            // Add more dishes
            await axios.post(
              `/api/restaurants/${restaurantIdToEdit}/dishes`,
              dishFormData,
              {
                headers: { "Content-Type": "multipart/form-data" },
              }
            );
            console.log(`Dish ${dish.name} created successfully!`);
          }
        })
      );

      console.log("Dishes saved successfully!");
      if (onDishesUpdated) {
        const updatedDishesResponse = await axios.get(
          `/api/restaurants/${restaurantIdToEdit}/dishes`
        );
        onDishesUpdated(updatedDishesResponse.data);
      }
      onHide(); // Close the modal after successful dish updates
    } catch (error) {
      console.error("Error saving dishes:", error);
      setDishesSaveError("Failed to save dishes.");
    } finally {
      setSavingDishes(false);
    }
  };

  const handleChange = (event) => {
    const { name, type, files, value } = event.target;

    if (name.startsWith("dishes")) {
      const index = parseInt(name.match(/\d+/)[0], 10);
      const field = name.split(".")[1];
      const updatedDishes = [...dishes];

      if (field === "price") {
        // Store the dollar value directly in the state for display
        updatedDishes[index] = {
          ...updatedDishes[index],
          [field]: value,
        };
      } else {
        updatedDishes[index] = {
          ...updatedDishes[index],
          [field]: type === "file" ? files[0] : value,
        };
      }
      setDishes(updatedDishes);
    } else {
      setRestaurantData((prevData) => ({
        ...prevData,
        [name]: type === "file" ? files[0] : value,
      }));
    }
  };

  const handleAddDish = () => {
    setDishes([
      ...dishes,
      { id: null, name: "", description: "", price: "", photo: null },
    ]);
    setNewDishAdded(true);
  };

  const handleDeleteDish = (index) => {
    const dishToDelete = dishes[index];
    const updatedDishes = dishes.filter((_, i) => i !== index);
    setDishes(updatedDishes);

    // if they delete an already existing dish, call DELETE API
    if (dishToDelete.id) {
      // sretch show a confirmation dialog before deleting
      axios
        .delete(`/api/dishes/${dishToDelete.id}`)
        .then((response) => {
          console.log(`Dish ${dishToDelete.name} deleted successfully!`);
          // Update the dish list
          if (onDishesUpdated) {
            axios
              .get(`/api/restaurants/${restaurantIdToEdit}/dishes`)
              .then((updatedDishesResponse) => {
                onDishesUpdated(updatedDishesResponse.data);
              })
              .catch((error) => {
                console.error("Error fetching updated dishes:", error);
              });
          }
        })
        .catch((error) => {
          console.error("Error deleting dish:", error);
        });
    }
  };

  return (
    <Modal show={show} onHide={onHide} size="lg">
      <Modal.Header closeButton></Modal.Header>
      <Modal.Body>
        <h2>Edit Restaurant</h2>
        <Form noValidate validated={validated} onSubmit={saveRestaurant}>
          <Form.Group className="mb-3 text-start">
            <Form.Label>Logo</Form.Label>
            <Form.Control type="file" name="logo" onChange={handleChange} />
            <Form.Text className="text-muted">
              Leave blank to keep the current logo.
            </Form.Text>
          </Form.Group>
          <Form.Group className="mb-3 text-start">
            <Form.Label>Restaurant&apos;s name</Form.Label>
            <Form.Control
              type="text"
              name="name"
              required
              onChange={handleChange}
              value={restaurantData.name}
            />
            <Form.Control.Feedback type="invalid">
              This field can&apos;t be empty.
            </Form.Control.Feedback>
          </Form.Group>
          <Form.Group className="mb-3 text-start">
            <Form.Label>Description</Form.Label>
            <Form.Control
              as="textarea"
              rows={3}
              name="description"
              required
              onChange={handleChange}
              value={restaurantData.description}
            />
            <Form.Control.Feedback type="invalid">
              This field can&apos;t be empty.
            </Form.Control.Feedback>
          </Form.Group>
          <Form.Group className="mb-3 text-start">
            <Form.Label>Select a category</Form.Label>
            <Form.Select
              id="category"
              name="category"
              required
              onChange={handleChange}
              value={restaurantData.category || ""}
            >
              <option value="">Select a category</option>
              {parsedCategories}
            </Form.Select>
            <Form.Control.Feedback type="invalid">
              Please select a category.
            </Form.Control.Feedback>
          </Form.Group>
          <Form.Group className="mb-3 text-start">
            <Form.Label>Location</Form.Label>
          </Form.Group>
          <Row className="mb-3 text-start">
            <Form.Group as={Col} md="6">
              <Form.Label>Address</Form.Label>
              <Form.Control
                type="text"
                placeholder="Street number and name"
                name="address"
                required
                onChange={handleChange}
                value={restaurantData.address}
              />
              <Form.Control.Feedback type="invalid">
                Please provide a valid address.
              </Form.Control.Feedback>
            </Form.Group>
            <Form.Group as={Col} md="6">
              <Form.Label>City</Form.Label>
              <Form.Control
                type="text"
                name="city"
                required
                onChange={handleChange}
                value={restaurantData.city}
              />
              <Form.Control.Feedback type="invalid">
                Please provide a valid city.
              </Form.Control.Feedback>
            </Form.Group>
            <Form.Group as={Col} md="3">
              <Form.Label>Province</Form.Label>
              <Form.Control
                type="text"
                name="province"
                required
                onChange={handleChange}
                value={restaurantData.province}
              />
              <Form.Control.Feedback type="invalid">
                Please provide a valid Province.
              </Form.Control.Feedback>
            </Form.Group>
            <Form.Group as={Col} md="3">
              <Form.Label>Country</Form.Label>
              <Form.Control
                type="text"
                name="country"
                required
                onChange={handleChange}
                value={restaurantData.country}
              />
              <Form.Control.Feedback type="invalid">
                Please provide a valid Country.
              </Form.Control.Feedback>
            </Form.Group>
            <Form.Group as={Col} md="3">
              <Form.Label>Postal Code</Form.Label>
              <Form.Control
                type="text"
                name="postalCode"
                required
                onChange={handleChange}
                value={restaurantData.postalCode}
              />
              <Form.Control.Feedback type="invalid">
                Please provide a valid postal code.
              </Form.Control.Feedback>
            </Form.Group>
          </Row>
          <Button
            variant="success"
            type="submit"
            disabled={savingRestaurant}
            className="mb-3"
          >
            {savingRestaurant ? "Saving Restaurant..." : "Update Restaurant"}
          </Button>
          {restaurantSaveError && (
            <p className="text-danger mt-2">{restaurantSaveError}</p>
          )}
        </Form>

        <hr />

        <h2>Edit Dishes</h2>
        {dishes.map((dish, index) => (
          <div key={index}>
            <Form.Group className="position-relative mb-3">
              <Form.Label>Photo</Form.Label>
              <Form.Control
                type="file"
                name={`dishes[${index}].photo`}
                onChange={handleChange}
              />
              <Form.Text className="text-muted">
                Leave blank to keep the current photo.
              </Form.Text>
            </Form.Group>
            <Form.Group className="mb-3 text-start">
              <Form.Label>Dish name</Form.Label>
              <Form.Control
                type="text"
                name={`dishes[${index}].name`}
                required
                onChange={handleChange}
                value={dish.name || ""}
              />
              <Form.Control.Feedback type="invalid">
                This field can&apos;t be empty.
              </Form.Control.Feedback>
            </Form.Group>
            <Form.Group className="mb-3 text-start">
              <Form.Label>Description</Form.Label>
              <Form.Control
                as="textarea"
                rows={3}
                name={`dishes[${index}].description`}
                required
                onChange={handleChange}
                value={dish.description || ""}
              />
              <Form.Control.Feedback type="invalid">
                This field can&apos;t be empty.
              </Form.Control.Feedback>
            </Form.Group>
            <Form.Label>Price</Form.Label>
            <InputGroup className="mb-3 text-start">
              <InputGroup.Text>$</InputGroup.Text>
              <Form.Control
                type="number"
                step="0.01"
                name={`dishes[${index}].price`}
                required
                onChange={handleChange}
                value={dish.price || ""}
              />
              <Form.Control.Feedback type="invalid">
                Please enter a price.
              </Form.Control.Feedback>
            </InputGroup>
            <Button
              type="button"
              variant="danger"
              onClick={() => handleDeleteDish(index)}
              className="mb-3 text-end"
            >
              Delete dish
            </Button>
          </div>
        ))}
        <Button type="button" onClick={handleAddDish} className="mb-3">
          +
        </Button>
        {dishesSaveError && (
          <p className="text-danger mt-2">{dishesSaveError}</p>
        )}
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={onHide}>
          Cancel
        </Button>
        <Button variant="success" onClick={saveDishes} disabled={savingDishes}>
          {savingDishes ? "Saving Dishes..." : "Save"}
        </Button>
      </Modal.Footer>
    </Modal>
  );
}

export default EditRestaurantModal;
