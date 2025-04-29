import React, { useState, useEffect, useMemo, useRef } from "react";
import TinderCard from "react-tinder-card";
import MatchedModal from "./MatchedModal";
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
  const dishCards = data;

  const [currentIndex, setCurrentIndex] = useState(dishCards.length - 1);
  const [lastDirection, setLastDirection] = useState();
  const saveSwiped = JSON.parse(localStorage.getItem("swipeHistory")) || [];
  const [swipedHistory, setSwipedHistory] = useState(saveSwiped);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [matchedDish, setMatchedDish] = useState(null);

  const lastSwipeDirectionRef = useRef(null);
  const currentIndexRef = useRef(currentIndex);

  // close modal handling
  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  // initializing stored history from localstrage
  useEffect(() => {
    const storedHistory = localStorage.getItem("swipeHistory");
    if (storedHistory) setSwipedHistory(JSON.parse(storedHistory));
  }, []);

  // creating an array of refs (childRefs) for each dish of dishCards array -> to interact actual DOM individually
  const childRefs = useMemo(
    () =>
      Array(dishCards.length)
        .fill(0)
        .map((i) => React.createRef()),
    []
  );

  const updateCurrentIndex = (index) => {
    setCurrentIndex(index);
    currentIndexRef.current = index;
  };

  const canGoBack = currentIndex < dishCards.length - 1;

  const canSwipe = currentIndex >= 0;

  // handle the case in which go back is pressed before card goes outOfFrame
  const outOfFrame = (name, index, direction) => {
    if (currentIndexRef.current >= index) {
      childRefs[index].current.restoreCard();
      updateCurrentIndex(index - 1);

      // Modal handle
      if (direction === "right") {
        // capture the matched dish
        setMatchedDish(dishCards[index]);
        setIsModalOpen(true);
      }
    }
  };

  const handleSwipe = async (direction, triggerByButton = false) => {
    if (!canSwipe || currentIndex >= dishCards.length) return;

    if (triggerByButton) {
      // Trigger swipe action/animation
      await childRefs[currentIndex].current.swipe(direction);
      return;
    }

    // setting the last direction
    setLastDirection(direction);
    lastSwipeDirectionRef.current = direction;

    // Capture the current dish id
    const currentDishId = dishCards[currentIndex].id;

    // Update swipe history and state
    setSwipedHistory((prev) => {
      const exisitingSwipe = prev.find(
        (entry) => entry.dish_id === currentDishId
      );

      let updatedHistory;
      if (exisitingSwipe) {
        // increment the appropriate swipe count
        updatedHistory = prev.map((entry) =>
          entry.dish_id === currentDishId
            ? {
                ...entry,
                right_swipes:
                  direction === "right"
                    ? exisitingSwipe.right_swipes + 1
                    : exisitingSwipe.right_swipes,
                left_swipes:
                  direction === "left"
                    ? exisitingSwipe.left_swipes + 1
                    : exisitingSwipe.left_swipes,
              }
            : entry
        );
      } else {
        updatedHistory = [
          ...prev,
          {
            dish_id: currentDishId,
            right_swipes: direction === "right" ? 1 : 0,
            left_swipes: direction === "left" ? 1 : 0,
          },
        ];
      }

      // storing swipeHistory in local sotrage
      localStorage.setItem("swipeHistory", JSON.stringify(updatedHistory));

      return updatedHistory;
    });
  };

  // undo swipe
  const handleUndoSwipe = async () => {
    if (!canGoBack) return;

    // Move back to former index
    const newIndex = currentIndex + 1;

    // Restore the currend dishCard
    if (childRefs[newIndex]?.current) {
      await childRefs[newIndex].current.restoreCard();
    }

    updateCurrentIndex(newIndex);

    // Remove last swipe record history
    setSwipedHistory((prev) => {
      const updateHistory = prev.slice(0, prev.length - 1);

      // update localStorage
      localStorage.setItem("swipeHistory", JSON.stringify(updateHistory));

      return updateHistory;
    });
  };

  return (
    <div>
      {isModalOpen && (
        <MatchedModal handleCloseModal={handleCloseModal} dish={matchedDish} />
      )}
      <h1>What are you munching today?</h1>
      <div className="card-container">
        {dishCards.map(
          (dish, index) =>
            index <= currentIndex && (
              <TinderCard
                key={dish.id}
                ref={childRefs[index]}
                className="swipe"
                preventSwipe={["up", "down"]}
                onSwipe={(direction) => handleSwipe(direction)}
                onCardLeftScreen={(direction) =>
                  outOfFrame(dish.name, index, direction)
                }
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
            )
        )}
        <div className="btn-container">
          <Button variant="danger" onClick={() => handleSwipe("left", true)}>
            Nah!
          </Button>
          <Button variant="warning" onClick={() => handleUndoSwipe()}>
            Undo Swipe
          </Button>
          <Button variant="success" onClick={() => handleSwipe("right", true)}>
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
