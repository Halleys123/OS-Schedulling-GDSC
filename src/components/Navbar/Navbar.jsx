import styles from "./Navbar.module.css";

import PropTypes from "prop-types";
import { useRef } from "react";

import AlgorithmCard from "../AlgorithmCard/AlgorithmCard";

let isDown = false;
let startX;
let scrollLeft;

Navbar.propTypes = {
  algorithms: PropTypes.array,
};

export default function Navbar({ algorithms = [] } = {}) {
  const navBar = useRef(null);

  return (
    <div
      className={styles.navbarMain}
      ref={navBar}
      onMouseDown={(e) => onMouseDown(e, navBar)}
      onMouseLeave={onMouseLeave}
      onMouseUp={onMouseUp}
      onMouseMove={(e) => onMouseMove(e, navBar)}
    >
      <span className={styles.title}>Algorithms</span>
      <div className={styles.navbar}>
        {algorithms
          .filter((algo) => algo.completed)
          .map((algorithm) => (
            <AlgorithmCard
              key={algorithm.id}
              name={algorithm?.name}
              description={algorithm?.description}
              icon={algorithm?.icon}
              metric={algorithm?.metric}
              link={algorithm?.link}
            />
          ))}
      </div>
    </div>
  );
}

function onMouseDown(e, navBar) {
  e.preventDefault();
  isDown = true;
  startX = e.pageX - navBar.current.offsetLeft;
  scrollLeft = navBar.current.scrollLeft;
}

function onMouseLeave() {
  isDown = false;
}
function onMouseUp() {
  isDown = false;
}

function onMouseMove(e, navBar) {
  if (!isDown) return;
  e.preventDefault();
  const x = e.pageX - navBar.current.offsetLeft;
  const walk = (x - startX) * 2; //scroll-fast
  navBar.current.scrollLeft = scrollLeft - walk;
}
