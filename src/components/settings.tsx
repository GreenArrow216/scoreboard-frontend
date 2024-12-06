import Modal from "./modal/modal";

import SettingsIcon from "../assets/settings.svg";
import { FormEvent, useEffect, useState } from "react";
import { MATCH_DETAILS, MatchDetails } from "../constants";
import { fetchPlayerData } from "../API/queries";

type PlayerTypes = {
  id: number;
  name: string;
};

type SettingsProps = {
  onSubmit: (arg: MatchDetails) => void;
};

const Settings = (props: SettingsProps) => {
  const [playerData, setPlayerData] = useState<PlayerTypes[]>([]);
  const [isModalOpen, setModalOpen] = useState<boolean>(false);
  const [formValues, setFormValues] = useState<MatchDetails>(MATCH_DETAILS);

  useEffect(() => {
    const fetchDataAndSetState = async () => {
      if (isModalOpen && playerData?.length === 0) {
        const data = await fetchPlayerData();
        if (data) {
          setPlayerData(data);
        }
      }
    };
    fetchDataAndSetState();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isModalOpen]);

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { id, value } = e.target;
    console.log({id,value})
    setFormValues((prev) => ({
      ...prev,
      [id]: id === "p1Nickname" || id === "p2Nickname" || value === undefined ? value : parseInt(value), // Ensure numbers are parsed
    }));
  };

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    props.onSubmit(formValues);
    setModalOpen(false)
  };

  return (
    <>
      <div className="settings-btn" onClick={() => setModalOpen(true)}>
        <img src={SettingsIcon} alt={"settings.svg"} />
      </div>
      <Modal
        title={"Change Settings"}
        isOpen={isModalOpen}
        setModalOpen={setModalOpen}
      >
        <form onSubmit={(e) => handleSubmit(e)}>
          <div>
            <div className="form-control">
              <p className="label">Player 1</p>
              <select
                id={"player1"}
                value={formValues.player1}
                onChange={handleInputChange}
              >
                <option>-</option>
                {playerData?.map((player, i) => (
                  <option key={i} value={player.id}>
                    {player.name}
                  </option>
                ))}
              </select>
            </div>
            <div className="form-control">
              <p className="label">Nick name</p>
              <input
                required={true}
                id={"p1Nickname"}
                value={formValues.p1Nickname}
                onChange={handleInputChange}
              />
            </div>
          </div>
          <div>
            <div className="form-control">
              <p className="label">Player 2</p>
              <select
                id={"player2"}
                value={formValues.player2}
                onChange={handleInputChange}
              >
                <option>-</option>
                {playerData?.map((player, i) => (
                  <option key={i} value={player.id}>
                    {player.name}
                  </option>
                ))}
              </select>
            </div>
            <div className="form-control">
              <p className="label">Nick name</p>
              <input
                required={true}
                id={"p2Nickname"}
                value={formValues.p2Nickname}
                onChange={handleInputChange}
              />
            </div>
          </div>
          <div className="form-control">
            <p className="label">Max score to win</p>
            <input
              required={true}
              type="number"
              id={"winningCount"}
              value={formValues.winningCount}
              onChange={handleInputChange}
            />
          </div>
          <button type="submit" className="submit-btn">
            Save
          </button>
        </form>
      </Modal>
    </>
  );
};

export default Settings;
