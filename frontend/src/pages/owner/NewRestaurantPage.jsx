import { useState, useEffect } from "react";

function NewRestaurantPage() {
  const [restaurantData, setRestaurantData] = useState({
    name: "",
    description: "",
    location: "",
    category: null,
    logo: null, // for file upload
  });

  const [dishes, setDishes] = useState([
    {
      id: "",
      name: "",
      description: "",
      price: "",
      photo: null,
    },
  ]);

  return (
    <div>
      <h1>New Restaurant Page</h1>
      <p>Create the details of a restaurant.</p>
    </div>
  );
}

export default NewRestaurantPage;
