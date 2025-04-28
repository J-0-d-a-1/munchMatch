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

  const [dishes, setDishes] = useState([
    { id: "", name: "", description: "", price: "", photo: null },
  ]);

  const parsedCategories = categories.map((category) => (
    <option key={category.id} value={category.id}>
      {category.name}
    </option>
  ));

  const handleSubmit = async (event) => {
    event.preventDefault();
    event.stopPropagation();

    const form = event.currentTarget;

    if (form.checkValidity() === false) {
      setValidated(true);
      return;
    }

    const fullLocation = `${restaurantData.address}, ${restaurantData.city}, ${restaurantData.province}, ${restaurantData.country}, ${restaurantData.postalCode}`;

    const formData = new FormData();
    formData.append("restaurant[name]", restaurantData.name);
    formData.append("restaurant[description]", restaurantData.description);
    formData.append("restaurant[location]", fullLocation);
    formData.append("restaurant[category_id]", restaurantData.category);
    formData.append("restaurant[logo]", restaurantData.logo);

    try {
      // Create the restaurant first
      const restaurantResponse = await axios.post(
        "/api/restaurants",
        formData,
        {
          headers: { "Content-Type": "multipart/form-data" },
        }
      );

      console.log("Restaurant created successfully:", restaurantResponse);

      const restaurantId = restaurantResponse.data.id;

      // Now create each dish individually
      await Promise.all(
        dishes.map(async (dish) => {
          const dishFormData = new FormData();
          const priceInCents = Math.round(dish.price * 100);

          dishFormData.append("dish[name]", dish.name);
          dishFormData.append("dish[description]", dish.description);
          dishFormData.append("dish[price]", priceInCents);
          dishFormData.append("dish[restaurant_id]", restaurantId);
          dishFormData.append("dish[photo]", dish.photo);

          await axios.post("/api/dishes", dishFormData, {
            headers: { "Content-Type": "multipart/form-data" },
          });
        })
      );

      navigate(`/restaurants/${restaurantId}`);
    } catch (error) {
      console.error("Error creating restaurant or dishes:", error);
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
  };

  const handleDeleteDish = (index) => {
    setDishes((prevDishes) => prevDishes.filter((_, i) => i !== index));
  };

  return (
    <div>
      <h1>Create your restaurant here!</h1>
      <Form noValidate validated={validated} onSubmit={handleSubmit}>
        <Form.Group className="position-relative mb-3">
          <Form.Label>Logo</Form.Label>
          <Form.Control
            type="file"
            required
            name="logo"
            onChange={handleChange}
          />
          <Form.Control.Feedback type="invalid" tooltip>
            Please upload a logo.
          </Form.Control.Feedback>
        </Form.Group>
        <Form.Group className="mb-3">
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
        <Form.Group className="mb-3">
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
        <Form.Group className="mb-3">
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
        <Form.Group className="mb-3">
          <Form.Label>Location</Form.Label>
        </Form.Group>
        <Row className="mb-3">
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
        <fieldset className="mb-3">
          <legend>Create a dish</legend>
          {dishes.map((dish, index) => (
            <div key={index}>
              <Form.Group className="position-relative mb-3">
                <Form.Label>Photo</Form.Label>
                <Form.Control
                  type="file"
                  required
                  name={`dishes[${index}].photo`}
                  onChange={handleChange}
                />
                <Form.Control.Feedback type="invalid" tooltip>
                  Please upload a photo.
                </Form.Control.Feedback>
              </Form.Group>
              <Form.Group className="mb-3">
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
              <Form.Group className="mb-3">
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
              <InputGroup className="mb-3">
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
              >
                Delete dish
              </Button>
            </div>
          ))}
          <Button type="button" onClick={handleAddDish}>
            Add dish
          </Button>
        </fieldset>
        <Button type="submit">Create Restaurant!</Button>
      </Form>
    </div>
  );
}

export default NewRestaurantPage;
