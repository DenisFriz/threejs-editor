import "./style.css";
import ReactDOM from "react-dom/client";
import { Canvas } from "@react-three/fiber";

import Experience from "./Experience";
import Main from "./Main";

const root = ReactDOM.createRoot(document.querySelector("#root"));

root.render(<Main />);
