import { formatDate } from "../helper";
import useGetData from "../hooks/useGetData";
import "../App.css";
import { MatchesAPI, PlayersAPI } from "../API/queries";
import Modal from "../components/modal/modal";
import { useState } from "react";

type MatchesType = {
  id: number;
  date_time_played: string;
  winner_id: number;
  winner_name: string;
  won_against: string;
};

type PlayersType = {
  id: number;
  name: string;
};

const ScoreTable = () => {
  const { data } = useGetData(MatchesAPI);
  const { data: playersAPIData } = useGetData(PlayersAPI);
  const matches: MatchesType[] = data ?? [];
  const players: PlayersType[] = playersAPIData ?? [];

  const [isModalOpen, setModalOpen] = useState<boolean>(false);

  const onAddUser = () => {
    setModalOpen(true);
  };

  return (
    <div className="score-table-container">
      <Modal
        title="Add User name"
        isOpen={isModalOpen}
        setModalOpen={setModalOpen}
      >
        <div className="form-control">
          <p className="label">New User name</p>
          <input
            required={true}
            id={"name"}
          />
        </div>
      </Modal>
      <div>
        <h3>Matches Played</h3>
        <table className="score-table">
          <thead>
            <tr>
              <th>Date Played</th>
              <th>Winner</th>
              <th>Won Against</th>
            </tr>
          </thead>
          <tbody>
            {matches?.map((match) => (
              <tr key={match.id}>
                <td>{formatDate(match.date_time_played)}</td>
                <td>{match.winner_name}</td>
                <td>{match.won_against}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <div>
        <h3>Players</h3>
        <table className="score-table">
          <thead>
            <tr>
              <th>Player name</th>
            </tr>
          </thead>
          <tbody>
            {players?.map((player) => (
              <tr key={player.id}>
                <td>{player.name}</td>
              </tr>
            ))}
            <tr>
              <td onClick={() => onAddUser()}>+ Add user</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ScoreTable;
