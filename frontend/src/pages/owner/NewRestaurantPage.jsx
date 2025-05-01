import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import InputGroup from "react-bootstrap/InputGroup";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";

function NewRestaurantPage({ categories }) {
  const navigate = useNavigate();
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
  const [restaurantId, setRestaurantId] = useState(null);
  const [dishes, setDishes] = useState([
    { id: "", name: "", description: "", price: "", photo: null },
  ]);
  const [savingRestaurant, setSavingRestaurant] = useState(false);
  const [dishesAdded, setDishesAdded] = useState(false);
  const [savingDishes, setSavingDishes] = useState(false);
  const [restaurantSaveError, setRestaurantSaveError] = useState(null);
  const [dishesSaveError, setDishesSaveError] = useState(null);

  const parsedCategories = categories.map((category) => (
    <option key={category.id} value={category.id}>
      {category.name}
    </option>
  ));

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
    formData.append("restaurant[logo]", restaurantData.logo);

    try {
      const restaurantResponse = await axios.post(
        "/api/restaurants",
        formData,
        {
          headers: { "Content-Type": "multipart/form-data" },
        }
      );

      console.log("Restaurant saved successfully:", restaurantResponse);
      setRestaurantId(restaurantResponse.data.id);
    } catch (error) {
      console.error("Error saving restaurant:", error);
      setRestaurantSaveError("Failed to save restaurant.");
    } finally {
      setSavingRestaurant(false);
    }
  };

  const saveDishes = async () => {
    if (!restaurantId) {
      setRestaurantSaveError("Please create a restaurant first.");
      return;
    }

    setSavingDishes(true);
    setDishesSaveError(null);

    try {
      await Promise.all(
        dishes.map(async (dish) => {
          const dishFormData = new FormData();
          dishFormData.append("dish[name]", dish.name);
          dishFormData.append("dish[description]", dish.description);
          dishFormData.append("dish[price]", dish.price);
          dishFormData.append("dish[photo]", dish.photo);

          await axios.post(
            `/api/restaurants/${restaurantId}/dishes`,
            dishFormData,
            {
              headers: { "Content-Type": "multipart/form-data" },
            }
          );
        })
      );

      console.log("Dishes saved successfully!");
      navigate(`/restaurants/${restaurantId}`);
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

      setDishes((prevDishes) => {
        const updatedDishes = [...prevDishes];
        updatedDishes[index] = {
          ...updatedDishes[index],
          [field]: type === "file" ? files[0] : value,
        };
        return updatedDishes;
      });
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
      { id: "", name: "", description: "", price: "", photo: null },
    ]);
    setDishesAdded(true);
  };

  const handleDeleteDish = (index) => {
    const updatedDishes = dishes.filter((_, i) => i !== index);
    setDishes(updatedDishes);
    if (updatedDishes.length === 0) {
      setDishesAdded(false); // Reset the flag if all dishes are removed
    }
  };

  const handleCancel = async () => {
    if (restaurantId && !dishesAdded) {
      try {
        await axios.delete(`/api/restaurants/${restaurantId}`);
        console.log("Empty restaurant deleted.");
      } catch (error) {
        console.error("Error deleting empty restaurant:", error);
        // Optionally show an error message to the user
      }
    }
    navigate("/user/restaurants");
  };

  return (
    <div>
      <h1>Create your restaurant here!</h1>
      <Form noValidate validated={validated} onSubmit={saveRestaurant}>
        <Form.Group className="mb-3 text-start">
          <Form.Label>Logo</Form.Label>
          <Form.Control
            type="file"
            required
            name="logo"
            onChange={handleChange}
          />
        </Form.Group>
        <Form.Group className="mb-3 text-start">
          <Form.Label>Restaurant&apos;s name</Form.Label>
          <Form.Control
            type="text"
            name="name"
            required
            onChange={handleChange}
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
            />
            <Form.Control.Feedback type="invalid">
              Please provide a valid postal code.
            </Form.Control.Feedback>
          </Form.Group>
        </Row>
        <Button type="submit" disabled={savingRestaurant}>
          {savingRestaurant ? "Saving Restaurant..." : "Add dishes"}
        </Button>
        {restaurantSaveError && (
          <p className="text-danger mt-2">{restaurantSaveError}</p>
        )}

        {restaurantId && (
          <fieldset className="mb-3 text-start mt-3">
            <legend>Add Dishes</legend>
            {dishes.map((dish, index) => (
              <div key={index}>
                <Form.Group className="position-relative mb-3">
                  <Form.Label>Photo</Form.Label>
                  <Form.Control
                    type="file"
                    required={dishes.length === 1} // Require at least one dish photo
                    name={`dishes[${index}].photo`}
                    onChange={handleChange}
                  />
                  <Form.Control.Feedback type="invalid" tooltip>
                    Please upload a photo.
                  </Form.Control.Feedback>
                </Form.Group>
                <Form.Group className="mb-3 text-start">
                  <Form.Label>Dish name</Form.Label>
                  <Form.Control
                    type="text"
                    name={`dishes[${index}].name`}
                    required
                    onChange={handleChange}
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
            <Button type="button" onClick={handleAddDish}>
              Add dish
            </Button>
          </fieldset>
        )}
        <Button
          type="button"
          onClick={saveDishes}
          disabled={savingDishes || dishes.length === 0}
          className="mt-3"
        >
          {savingDishes ? "Saving Dishes..." : "Create"}
        </Button>
        {dishesSaveError && (
          <p className="text-danger mt-2">{dishesSaveError}</p>
        )}

        <Button onClick={handleCancel} variant="secondary" className="mt-3">
          Cancel
        </Button>
      </Form>
    </div>
  );
}

export default NewRestaurantPage;
