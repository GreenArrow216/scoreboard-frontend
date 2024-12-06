import Modal from "./modal/modal";

import SettingsIcon from "../assets/settings.svg";
import useGetData from "../hooks/useGetData";
import { useState } from "react";

type PlayerTypes = {
  id: number;
  name: string;
};

const Settings = () => {
  const { data, loading } = useGetData("http://localhost:3000/players");
  const [isModalOpen,setModalOpen] = useState<boolean>(false)

  const playerData: PlayerTypes[] = data ? data : [];

  console.log({ scoreData: playerData, loading });
  return (
    <>
      <div className="settings-btn" onClick={() => setModalOpen(true)}>
        <img src={SettingsIcon} alt={"settings.svg"} />
      </div>
      <Modal title={"Change Settings"} isOpen={isModalOpen} setModalOpen={setModalOpen}>
        <form>
          <div>
            <div className="form-control">
              <p className="label">Player 1</p>
              <select>
                {playerData?.map((player, i) => (
                  <option key={i} value={player.id}>{player.name}</option>
                ))}
              </select>
            </div>
            <div className="form-control">
              <p className="label">Nick name</p>
              <input required={true} defaultValue={"Team 1"} />
            </div>
          </div>
          <div>
            <div className="form-control">
              <p className="label">Player 2</p>
            <select>
              {playerData?.map((player, i) => (
                <option key={i} value={player.id}>{player.name}</option>
              ))}
            </select>
            </div>
            <div className="form-control">
              <p className="label">Nick name</p>
              <input required={true} defaultValue={"Team 2"} />
            </div>
          </div>
          <div className="form-control">
            <p className="label">Max score to win</p>
            <input required={true} type="number"/>
          </div>
        </form>
      </Modal>
    </>
  );
};

export default Settings;
