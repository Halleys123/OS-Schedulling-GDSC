import styles from "./AlgorithmCard.module.css";

import { NavLink } from "react-router-dom";
import PropTypes from "prop-types";

AlgorithmCard.propTypes = {
  name: PropTypes.string,
  description: PropTypes.string,
  icon: PropTypes.string,
  metric: PropTypes.string,
  link: PropTypes.string,
};

export default function AlgorithmCard({
  name = "",
  description = "",
  icon = "",
  metric = "",
  link = "/",
} = {}) {
  return (
    <NavLink
      className={({ isActive }) => {
        return isActive ? styles.active : styles.box;
      }}
      to={link}
    >
      <div className={styles.heading}>
        <img src={icon} alt="icon" className={styles.icon} />
        <h1 className={styles.name}>{name}</h1>
      </div>
      <div className={styles.descriptionBox}>
        <span className={styles.description}>{description}</span>
        <span className={styles.metric}>{metric}</span>
      </div>
    </NavLink>
  );
}
