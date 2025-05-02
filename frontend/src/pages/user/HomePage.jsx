import React, { useState } from "react";
import MenuCard from "../../components/MenuCard";
import Category from "../../components/Category";

function HomePage({ categories, currentUser, setCurrentUser }) {
  const [selectedCategory, setSelectedCategory] = useState(null);

  const handleCategorySelect = (categoryId) => {
    setSelectedCategory(categoryId);
  };

  return (
    <div>
      <Category
        categories={categories}
        onSelectCategory={handleCategorySelect}
        selectedCategory={selectedCategory}
      />
      <MenuCard currentUser={currentUser} setCurrentUser={setCurrentUser} />
    </div>
  );
}

export default HomePage;
