import React, { useState } from "react";
import MenuCard from "../../components/MenuCard";
import Category from "../../components/Category";

function HomePage({ categories }) {
  const [selectedCategory, setSelectedCategory] = useState(null);
  console.log(selectedCategory);
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
      <MenuCard />
    </div>
  );
}

export default HomePage;
