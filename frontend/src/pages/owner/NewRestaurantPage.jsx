import { useState, useEffect } from "react";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import InputGroup from "react-bootstrap/InputGroup";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";

function NewRestaurantPage() {
  const [validated, setValidated] = useState(false);

  const [restaurantData, setRestaurantData] = useState({
    name: "",
    description: "",
    location: "",
    category: null,
    logo: null, // for file upload
  });

  const [dishes, setDishes] = useState([]);

  const handleSubmit = (event) => {
    const form = event.currentTarget;
    if (form.checkValidity() === false) {
      event.preventDefault();
      event.stopPropagation();
    }

    setValidated(true);
  };

  const handleChange = (event) => {
    const { name, value } = event.target;
    setRestaurantData({
      ...restaurantData,
      [name]: value,
    });
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
            // isInvalid={}
          />
          <Form.Control.Feedback type="invalid" tooltip>
            {/* {errors.file} */}
          </Form.Control.Feedback>
        </Form.Group>
        <Form.Group className="mb-3" controlId="validationCustomRestaurantName">
          <Form.Label>Restaurant&apos;s name</Form.Label>
          <Form.Control
            type="text"
            name="restaurant's name"
            required
            onChange={handleChange}
          />
          <Form.Control.Feedback type="invalid">
            This field can&apos;t be empty.
          </Form.Control.Feedback>
        </Form.Group>
        <Form.Group className="mb-3" controlId="validationCustomDescription">
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
        <Form.Group className="mb-3" controlId="validationCustomCategory">
          <Form.Label>Select a category</Form.Label>
          <Form.Select>
            <option>Select a category</option>
            <option>Comfort</option>
            <option>Indian</option>
            <option>Japanese</option>
            <option>Mexican</option>
          </Form.Select>
        </Form.Group>
        <Form.Group className="mb-3" controlId="validationCustomLocation">
          <Form.Label>Location</Form.Label>
        </Form.Group>
        <Row className="mb-3">
          <Form.Group as={Col} md="6" controlId="validationCustom03">
            <Form.Label>Address</Form.Label>
            <Form.Control
              type="text"
              placeholder="Address"
              name="address"
              required
              onChange={handleChange}
            />
            <Form.Control.Feedback type="invalid">
              Please provide a valid address.
            </Form.Control.Feedback>
          </Form.Group>
          <Form.Group as={Col} md="6" controlId="validationCustom03">
            <Form.Label>City</Form.Label>
            <Form.Control
              type="text"
              placeholder="City"
              name="city"
              required
              onChange={handleChange}
            />
            <Form.Control.Feedback type="invalid">
              Please provide a valid city.
            </Form.Control.Feedback>
          </Form.Group>
          <Form.Group as={Col} md="3" controlId="validationCustom04">
            <Form.Label>Province</Form.Label>
            <Form.Control
              type="text"
              placeholder="Province"
              name="province"
              required
              onChange={handleChange}
            />
            <Form.Control.Feedback type="invalid">
              Please provide a valid Province.
            </Form.Control.Feedback>
          </Form.Group>
          <Form.Group as={Col} md="3" controlId="validationCustom04">
            <Form.Label>Country</Form.Label>
            <Form.Control
              type="text"
              placeholder="Country"
              name="country"
              required
              onChange={handleChange}
            />
            <Form.Control.Feedback type="invalid">
              Please provide a valid Country.
            </Form.Control.Feedback>
          </Form.Group>
          <Form.Group as={Col} md="3" controlId="validationCustom05">
            <Form.Label>Postal Code</Form.Label>
            <Form.Control
              type="text"
              placeholder="PostalCode"
              name="postal code"
              required
              onChange={handleChange}
            />
            <Form.Control.Feedback type="invalid">
              Please provide a valid postal code.
            </Form.Control.Feedback>
          </Form.Group>
        </Row>
        <fieldset>
          <legend>Create a dish</legend>
          <Form.Group className="position-relative mb-3">
            <Form.Label>Photo</Form.Label>
            <Form.Control
              type="file"
              required
              name="photo"
              onChange={handleChange}
              // isInvalid={}
            />
            <Form.Control.Feedback type="invalid" tooltip>
              {/* {errors.file} */}
            </Form.Control.Feedback>
          </Form.Group>
          <Form.Group className="mb-3" controlId="validationCustomDishName">
            <Form.Label>Dish name</Form.Label>
            <Form.Control
              type="text"
              name="dish name"
              required
              onChange={handleChange}
            />
            <Form.Control.Feedback type="invalid">
              This field can&apos;t be empty.
            </Form.Control.Feedback>
          </Form.Group>
          <Form.Group
            className="mb-3"
            controlId="validationCustomDishDescription"
          >
            <Form.Label>Description</Form.Label>
            <Form.Control
              as="textarea"
              rows={3}
              name="dish description"
              required
              onChange={handleChange}
            />
            <Form.Control.Feedback type="invalid">
              This field can&apos;t be empty.
            </Form.Control.Feedback>
          </Form.Group>
          <Form.Label>Price</Form.Label>
          <InputGroup className="mb-3" controlId="validationCustomPrice">
            <InputGroup.Text>$</InputGroup.Text>
            <Form.Control
              aria-label="Amount"
              name="price"
              required
              onChange={handleChange}
            />
            <Form.Control.Feedback type="invalid">
              This field can&apos;t be empty.
            </Form.Control.Feedback>
          </InputGroup>
        </fieldset>
        <Button type="submit">Create Restaurant!</Button>
      </Form>
    </div>
  );
}

export default NewRestaurantPage;
