import React, { useState, useEffect, useMemo, useRef } from "react";
import TinderCard from "react-tinder-card";
import { Card, Button } from "react-bootstrap";

import "../Temp.css";

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
  const disheCards = data;

  const [currentIndex, setCurrentIndex] = useState(disheCards.length - 1);
  const [lastDirection, setLastDirection] = useState();
  const currentIndexRef = useRef(currentIndex);

  // creating an array of refs (childRefs) for each dish of disheCards array -> to interact actual DOM individually
  const childRefs = useMemo(
    () =>
      Array(disheCards.length)
        .fill(0)
        .map((i) => React.createRef()),
    []
  );

  const updateCurrentIndex = (index) => {
    setCurrentIndex(index);
    currentIndexRef.current = index;
  };

  const canGoBack = currentIndex < disheCards.length - 1;

  const canSwipe = currentIndex >= 0;

  // set last direction
  const swiped = (direction, index) => {
    setLastDirection(direction);
    updateCurrentIndex(index - 1);
  };

  const outOfFrame = (name, index) => {
    currentIndexRef.current >= index && childRefs[index].current.restoreCard();
  };

  const swipe = async (direction) => {
    if (canSwipe && currentIndex < disheCards.length) {
      // Swipe dish card
      await childRefs[currentIndex].current.swipe(direction);
    }
  };

  // increase current index and show card
  const goBack = async () => {
    if (!canGoBack) return;
    const newIndex = currentIndex + 1;
    updateCurrentIndex(newIndex);
    await childRefs[newIndex].current.restoreCard();
  };

  return (
    <div>
      <h1>What are you munching today?</h1>
      <div className="card-container">
        {disheCards.map((dish, index) => (
          <TinderCard
            key={dish.id}
            ref={childRefs[index]}
            className="swipe"
            preventSwipe={["up", "down"]}
            onSwipe={(direction) => swiped(direction, index)}
            onCardLeftScreen={() => outOfFrame(dish.name, index)}
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
                <Card.Title className="card-title">{dish.name}</Card.Title>
              </Card.Body>
            </Card>
          </TinderCard>
        ))}
        <div className="btn-container">
          <Button variant="danger" onClick={() => swipe("left")}>
            Nah!
          </Button>
          <Button variant="warning" onClick={() => goBack()}>
            Undo Swipe
          </Button>
          <Button variant="success" onClick={() => swipe("right")}>
            Yum!
          </Button>
        </div>
        {lastDirection ? (
          <h3 key={lastDirection} className="light">
            You swiped {lastDirection}
          </h3>
        ) : (
          <h3 className="light">Swipe a card or press button!</h3>
        )}
      </div>
    </div>
  );
}

export default MenuCard;
