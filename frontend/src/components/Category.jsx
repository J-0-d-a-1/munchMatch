const category = [
  {
    name: "Mexican",
  },
  {
    name: "Japanese",
  },
  {
    name: "Indian",
  },
  {
    name: "Confort",
  },
];

function Category() {
  return (
    <div>
      {category.map((item) => {
        return (
          <a key={item.name} style={{ display: "inline-block" }}>
            <div>{item.name}</div>
          </a>
        );
      })}
    </div>
  );
}

export default Category;
