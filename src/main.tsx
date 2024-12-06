import ReactDOM from "react-dom/client";
import { BrowserRouter, Routes, Route } from "react-router";
import App from "./App.tsx";
import './index.css'
import ScoreTable from "./pages/scoreTable.tsx";

const root = document.getElementById("root");

ReactDOM.createRoot(root!).render(
  <BrowserRouter>
    <Routes>
      <Route path="/" element={<App />} />
      <Route path="/scoreboard" element={<ScoreTable/>}/>
    </Routes>
  </BrowserRouter>
);
