import MenuCard from "../../components/MenuCard";
import Category from "../../components/Category";

function HomePage({
  currentUser,
  categories,
  selectedCategory,
  handleCategorySelect,
}) {
  return (
    <>
      <div>
        <Category
          categories={categories}
          onSelectCategory={handleCategorySelect}
          selectedCategory={selectedCategory}
        />
        <MenuCard
          currentUser={currentUser}
          selectedCategory={selectedCategory}
        />
      </div>
      <div className="references">
        Icons by{" "}
        <a href="https://icons8.com/" target="_blank">
          Icons8
        </a>
      </div>
    </>
  );
}

export default HomePage;
