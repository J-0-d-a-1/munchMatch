function Category({ categories }) {
  return (
    <div>
      {categories.map((category) => {
        return (
          <a key={category.name} style={{ display: "inline-block" }}>
            <div>{category.name}</div>
          </a>
        );
      })}
    </div>
  );
}

export default Category;
