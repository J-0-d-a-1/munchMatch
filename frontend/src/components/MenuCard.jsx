import React, { useState, useEffect, useMemo, useRef } from "react";
import TinderCard from "react-tinder-card";
import { Card, Button } from "react-bootstrap";

const data = [
  {
    id: 1,
    name: "Sushi",
    description: "Japanese Traditional food",
    restaurant_id: 1,
    prince_in_cent: 2000,
    photo_url: "../../../mock_image/japanese.png",
    category_id: 1,
  },
  {
    id: 2,
    name: "Curry",
    description: "Indian Traditional food",
    restaurant_id: 2,
    prince_in_cent: 2000,
    photo_url: "../../../mock_image/indian.png",
    category_id: 2,
  },
  {
    id: 3,
    name: "Tacos",
    description: "Mexican Traditional food",
    restaurant_id: 3,
    prince_in_cent: 2000,
    photo_url: "../../../mock_image/mexican.png",
    category_id: 3,
  },
];

function MenuCard() {
  const dishes = data;

  const [currentIndex, setCurrentIndex] = useState(dishes.length - 1);
  const [lastDirection, setLastDirection] = useState();
  const currentIndexRef = useRef(currentIndex);

  // creating an array of refs (childRefs) for each dish of dishes array -> to interact actual DOM individually
  const childRefs = useMemo(() => {
    Array(dishes.length)
      .fill(0)
      .map((i) => React.createRef());
  }, []);

  const updateCurrentIndex = (index) => {
    setCurrentIndex(index);
    currentIndexRef.current = index;
  };

  const canGoBack = currentIndex < dishes.length - 1;

  const canSwipe = currentIndex >= 0;

  const swiped = (direction, index) => {
    setLastDirection(direction);
    updateCurrentIndex(index - 1);
  };

  return (
    <div>
      <h1>What are you munching?</h1>
      <div>
        {dishes.map((dish) => (
          <TinderCard
            key={dish.id}
            className="swipe"
            preventSwipe={["up", "down"]}
            onSwipe={(direction) => swiped(direction, dish.id)}
          >
            <Card
              style={{
                width: "18rem",
              }}
            >
              <Card.Body>
                <Card.Img
                  src={dish.photo_url}
                  style={{ width: "200px", height: "200px" }}
                />
                <Card.Title>{dish.name}</Card.Title>
                <div>
                  <Button variant="danger">Nah!</Button>
                  <Button variant="warning">Undo</Button>
                  <Button variant="success">Yum!</Button>
                </div>
              </Card.Body>
            </Card>
          </TinderCard>
        ))}
      </div>
    </div>
  );
}

export default MenuCard;
