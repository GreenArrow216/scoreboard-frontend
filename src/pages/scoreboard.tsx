import { TouchEvent, useEffect, useState } from "react";
import "../App.css";

import ResetIcon from "../assets/reset.svg";
import CloudSave from "../assets/cloud-upload.svg";
import Settings from "../components/settings";
import { MATCH_DETAILS, MatchDetails } from "../constants";
import { throwConfetti } from "../helper";
import useMutateData from "../hooks/useMutateData";
import useGetData from "../hooks/useGetData";
import { MatchesAPI, PlayersAPI } from "../API/queries";

export type PlayerTypes = {
  id: number;
  name: string;
};

const Scoreboard = () => {
  const [countLeft, setCountLeft] = useState<number>(0);
  const [countRight, setCountRight] = useState<number>(0);
  const [startY, setStartY] = useState<number | null>(null);
  const [matchDetails, setMatchDetails] = useState<MatchDetails>(MATCH_DETAILS);

  const winnerId =
    countLeft >= matchDetails.winningCount
      ? matchDetails.player1
      : countRight >= matchDetails.winningCount
      ? matchDetails.player2
      : undefined;

  const { data } = useGetData(PlayersAPI);
  const playerData: PlayerTypes[] = data ?? [];
  const { mutateData } = useMutateData();

  const handleTouchStart = (e: TouchEvent<HTMLDivElement>) => {
    setStartY(e.touches[0].clientY);
  };

  const handleTouchEnd = (e: TouchEvent<HTMLDivElement>, isLeft: boolean) => {
    if (startY === null) return;
    const endY = e.changedTouches[0].clientY;
    const deltaY = startY - endY;
    if (Math.abs(deltaY) > 50) {
      if (deltaY > 0) {
        if (isLeft) {
          setCountLeft((prev) => prev + 1);
        } else {
          setCountRight((prev) => prev + 1);
        }
      } else {
        if (isLeft) {
          setCountLeft((prev) => prev - 1);
        } else {
          setCountRight((prev) => prev - 1);
        }
      }
    }
    setStartY(null);
  };

  const onSubmit = (values: MatchDetails) => {
    console.log({ values });
    setMatchDetails(values);
  };

  const saveMatchDetails = () => {
    if (winnerId) {
      mutateData(MatchesAPI, "POST", {
        datePlayed: new Date().toISOString(),
        winnerId: winnerId,
        winnerName: findPlayerName(winnerId),
        wonAgainst: findPlayerName(
          matchDetails.player1 === winnerId
            ? matchDetails.player2
            : matchDetails.player1
        ),
      }).then(() => {
        setCountLeft(0);
        setCountRight(0);
      });
    }
  };

  useEffect(() => {
    if (countLeft >= matchDetails.winningCount) {
      throwConfetti("left");
    } else if (countRight >= matchDetails.winningCount) {
      throwConfetti("right");
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [countLeft, countRight]);

  const findPlayerName = (id?: number) => {
    return playerData && playerData.find((player) => player.id === id)?.name;
  };

  return (
    <div className="container center">
      <canvas id="my-canvas"></canvas>
      <Settings onSubmit={onSubmit} playerData={playerData} />
      <div
        className="left"
        onTouchStart={handleTouchStart}
        onTouchEnd={(e) => handleTouchEnd(e, true)}
        onClick={() => setCountLeft((prevState) => prevState + 1)}
      >
        <div className="nickname">
          <p>{matchDetails.p1Nickname}</p>
          <p className="helper-text">
            (
            {findPlayerName(matchDetails.player1)
              ? findPlayerName(matchDetails.player1)
              : "Please select a user in settings"}
            )
          </p>
        </div>
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
        className={`cloud-btn svg-btn center ${!winnerId ? "disabled" : ""}`}
        onClick={() => saveMatchDetails()}
      >
        <img src={CloudSave} alt={"cloud-upload.svg"} />
      </div>
      <div
        className="right"
        onTouchStart={handleTouchStart}
        onTouchEnd={(e) => handleTouchEnd(e, false)}
        onClick={() => setCountRight((prevState) => prevState + 1)}
      >
        <div className="nickname">
          <p>{matchDetails.p2Nickname}</p>
          <p className="helper-text">
            (
            {findPlayerName(matchDetails.player2)
              ? findPlayerName(matchDetails.player2)
              : "Please select a user in settings"}
            )
          </p>
        </div>
        <div className="content center">
          <p>{countRight}</p>
        </div>
      </div>
    </div>
  );
};

export default Scoreboard;
