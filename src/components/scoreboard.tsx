import { TouchEvent, useState } from "react";
import "../App.css";

import ResetIcon from "../assets/reset.svg";
import CloudSave from "../assets/cloud-upload.svg"
import Settings from "./settings";

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
      <Settings/>
      <div
        className="left"
        style={{ background: "red" }}
        onTouchStart={handleTouchStart}
        onTouchEnd={(e) => handleTouchEnd(e, true)}
        onClick={() => setCountLeft((prevState) => prevState + 1)}
      >
        <p className="nickname">Team 1</p>
        <div className="content center">
          <p>{countLeft}</p>
        </div>
      </div>
      <div
        className="reset-btn svg-btn center"
        onClick={() => {
          setCountLeft(0);
          setCountRight(0);
        }}
      >
        <img src={ResetIcon} alt={"reset.svg"} />
      </div>
      <div
        className="cloud-btn svg-btn center"
      >
        <img src={CloudSave} alt={"cloud-upload.svg"} />
      </div>
      <div
        className="right"
        style={{ background: "blue" }}
        onTouchStart={handleTouchStart}
        onTouchEnd={(e) => handleTouchEnd(e, false)}
        onClick={() => setCountRight((prevState) => prevState + 1)}
      >
        <p className="nickname">Team 2</p>
        <div className="content center">
          <p>{countRight}</p>
        </div>
      </div>
    </div>
  );
};

export default Scoreboard;
