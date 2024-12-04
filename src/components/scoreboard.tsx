import { TouchEvent, useState } from "react";
import "../App.css";

import Reset from "../assets/reset.svg";
import Settings from "../assets/settings.svg";
import Modal from "./modal/modal";

const Scoreboard = () => {
  const [countLeft, setCountLeft] = useState<number>(0);
  const [countRight, setCountRight] = useState<number>(0);
  const [startY, setStartY] = useState<number | null>(null);

  const handleTouchStart = (e: TouchEvent<HTMLDivElement>) => {
    // Record the initial Y position when the touch starts
    setStartY(e.touches[0].clientY);
  };

  const handleTouchEnd = (e: TouchEvent<HTMLDivElement>, isLeft: boolean) => {
    if (startY === null) return;

    const endY = e.changedTouches[0].clientY;
    const deltaY = startY - endY;

    if (Math.abs(deltaY) > 50) {
      // Swipe threshold of 50px
      if (deltaY > 0) {
        if (isLeft) {
          setCountLeft((prev) => prev + 1);
        } else {
          setCountRight((prev) => prev + 1);
        }
        // Swipe up
      } else {
        // Swipe down
        if (isLeft) {
          setCountLeft((prev) => prev - 1);
        } else {
          setCountRight((prev) => prev - 1);
        }
      }
    }

    setStartY(null); // Reset the start position
  };
  return (
    <div className="container center">
      <div className="settings-btn">
        <img src={Settings} alt={"settings.svg"} />
      </div>
      <Modal title={"Change Settings"} isOpen={true}>
        <input/>
        <input/>
        <input/>
        <input/>
      </Modal>
      <div
        className="left center"
        style={{ background: "red" }}
        onTouchStart={handleTouchStart}
        onTouchEnd={(e) => handleTouchEnd(e, true)}
        onClick={() => setCountLeft((prevState) => prevState + 1)}
      >
        <div className="content">
          <p>Team 1</p>
          <p>{countLeft}</p>
        </div>
      </div>
      <div
        className="reset-btn center"
        onClick={() => {
          setCountLeft(0);
          setCountRight(0);
        }}
      >
        <img src={Reset} alt={"reset.svg"} />
      </div>
      <div
        className="right center"
        style={{ background: "blue" }}
        onTouchStart={handleTouchStart}
        onTouchEnd={(e) => handleTouchEnd(e, false)}
        onClick={() => setCountRight((prevState) => prevState + 1)}
      >
        <div className="content">
          <p>Team 2</p>
          <p>{countRight}</p>
        </div>
      </div>
    </div>
  );
};

export default Scoreboard;
