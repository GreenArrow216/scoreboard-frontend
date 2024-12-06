import { formatDate } from "../helper";
import useGetData from "../hooks/useGetData";
import '../App.css'

type MatchesType = {
  id: number;
  date_time_played: string;
  winner_id: number;
  winner_name: string,
  won_against: string
};

const ScoreTable = () => {
  const { data } = useGetData("http://localhost:3000/matches");
  const matches: MatchesType[] = data ?? [];
  console.log({matches})
  return (
    <div className="score-table-container">
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
  );
};

export default ScoreTable;
