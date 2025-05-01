import { Button } from 'react-bootstrap';

function Category({ categories, onSelectCategory, selectedCategory }) {
  return (
    <div className="category-container">
      <Button
        variant={selectedCategory === null ? 'primary' : 'outline-primary'}
        className="category-btn me-2 mb-2"
        onClick={() => onSelectCategory(null)}
      >
        All
      </Button>

      {categories.map((category) => (
        <Button
          key={category.id}
          variant={selectedCategory === category.id ? 'primary' : 'outline-primary'}
          className="category-btn me-2 mb-2"
          onClick={() => onSelectCategory(category.id)}
        >
          {category.name}
        </Button>
      ))}
    </div>
  );
}

export default Category;
