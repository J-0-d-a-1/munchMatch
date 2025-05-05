import { useState } from "react";
import MenuCard from "../../components/MenuCard";
import Category from "../../components/Category";

function HomePage({
  categories,
  currentUser,
  setCurrentUser,
  handleMenuList,
  selectedCategory,
  setSelectedCategory,
  handleCategorySelect,
}) {
  return (
    <div>
      <Category
        categories={categories}
        onSelectCategory={handleCategorySelect}
        selectedCategory={selectedCategory}
      />
      <MenuCard selectedCategory={selectedCategory} />
    </div>
  );
}

export default HomePage;
