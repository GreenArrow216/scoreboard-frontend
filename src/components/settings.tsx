import Modal from "./modal/modal";

import SettingsIcon from "../assets/settings.svg";
import useGetData from "../hooks/useGetData";
import { useState } from "react";

type ScoreType = {
  id: number;
  name: string;
  score: number;
};

const Settings = () => {
  const { data, loading } = useGetData("http://localhost:3000/players");
  const [isModalOpen,setModalOpen] = useState<boolean>(false)

  const scoreData: ScoreType[] = data ? data : [];

  console.log({ scoreData, loading });
  return (
    <>
      <div className="settings-btn" onClick={() => setModalOpen(true)}>
        <img src={SettingsIcon} alt={"settings.svg"} />
      </div>
      <Modal title={"Change Settings"} isOpen={isModalOpen} setModalOpen={setModalOpen}>
        <form>
          <div>
            <div>
              <p className="label">Player</p>
              <select>
                {scoreData?.map((scoreDetails, i) => (
                  <option key={i}>{scoreDetails.name}</option>
                ))}
                <option></option>
              </select>
            </div>
            <div>
              <p className="label">Nick name</p>
              <input required={true} defaultValue={"Team 1"} />
            </div>
          </div>
          <div>
            <select>
              {scoreData?.map((scoreDetails, i) => (
                <option key={i}>{scoreDetails.name}</option>
              ))}
              <option></option>
            </select>
            <div>
              <p className="label">Nick name</p>
              <input required={true} defaultValue={"Team 2"} />
            </div>
          </div>
          <div>
            <p className="label">Max score to win</p>
            <input required={true} type="number"/>
          </div>
          {/* <div>
            <input />
          </div>
          <div>
            <input />
          </div> */}
        </form>
      </Modal>
    </>
  );
};

export default Settings;
