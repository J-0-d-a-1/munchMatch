import "../../styles/category.scss";
import MexicanIcon from "../assets/mexican_icon.png";
import JapaneseIcon from "../assets/japanese_icon.png";
import IndianIcon from "../assets/indian_icon.png";
import ComfortIcon from "../assets/comfort_icon.png";
import AllIcon from "../assets/all_icon.png";

function Category({ categories, onSelectCategory, selectedCategory }) {
  const getCategoryIcon = (categoryName) => {
    switch (categoryName.toLowerCase()) {
      case "all":
        return AllIcon;
      case "mexican":
        return MexicanIcon;
      case "japanese":
        return JapaneseIcon;
      case "indian":
        return IndianIcon;
      case "comfort":
        return ComfortIcon;
      default:
        return ".../icons8-utensils-external-flaticons-flat-flat-icons-96.png";
    }
  };

  return (
    <div className="category-container">
      <div className="categories-list">
        <div className="category-item-vertical">
          {" "}
          <img
            src={getCategoryIcon("all")}
            alt="all"
            className="category-icon"
            onClick={() => onSelectCategory(null)}
          />
          <span className="category-name">All</span>
        </div>
        {categories.map((category) => (
          <div key={category.id} className="category-item-vertical">
            {" "}
            <img
              src={getCategoryIcon(category.name)}
              alt={`${category.name} Icon`}
              className="category-icon"
              onClick={() => onSelectCategory(category.id)}
            />
            <span className="category-name">{category.name}</span>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Category;
