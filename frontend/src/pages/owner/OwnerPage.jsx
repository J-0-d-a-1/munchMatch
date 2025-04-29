import axios from "axios";
import React from "react";

function OwnerPage() {
  axios
    .get("/api/restaurants")
    .then((response) => {
      console.log(response.data); // Handle the data
    })
    .catch((error) => {
      console.error("Error fetching dishes:", error);
    });

  return (
    <div>
      <h1>Owner Page</h1>
      <p>Manage your restaurants and dishes here.</p>
    </div>
  );
}

export default OwnerPage;
