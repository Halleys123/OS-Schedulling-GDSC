import styles from "./Homepage.module.css";

import { useParams } from "react-router-dom";

import InformationPanel from "../../components/InformationPanel/InformationPanel";
import Visualizer from "../../components/Visualizer/Visualizer";

export default function Homepage() {
  const { algorithmId } = useParams();
  return (
    <div className={styles.homepage}>
      <InformationPanel algorithmId={algorithmId || "None"} />
      <div className={styles.divider}></div>
      <Visualizer />
    </div>
  );
}
