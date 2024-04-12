import { useContext, useEffect, useRef, useState } from "react"; // * Add your react imports here
import PropTypes from "prop-types"; // ! Should Not be removed

import { motion } from "framer-motion"; // * Add your framer-motion imports here

import styles from "./FilterInputStyles.module.css"; // * Every page will have a CSS file which would be automatically be imported here

FilterInput.propTypes = {
  label: PropTypes.string,
  placeholder: PropTypes.string,
  value: PropTypes.string,
  setValue: PropTypes.func,
  icon: PropTypes.string,
  successIcon: PropTypes.string,
  errorIcon: PropTypes.string,
  type: PropTypes.string,
  hasError: PropTypes.bool,
  validation: PropTypes.instanceOf(RegExp),
  setValidation: PropTypes.func,
  isSuccess: PropTypes.bool,
};

export default function FilterInput({
  label = "Name:",
  placeholder = "Placeholder",
  value = "",
  setValue = () => {},
  type = "text",
  setValidation = () => {},
  validation = new RegExp(""),
}) {
  const [isActive, setIsActive] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [hasError, setHasError] = useState(false);

  useEffect(() => {
    if (value === "") {
      setHasError(false);
      setIsSuccess(false);
      setValidation(false);
      return;
    }
    if (validation.test(value)) {
      setHasError(false);
      setValidation(true);
      setIsSuccess(true);
    } else {
      setHasError(true);
      setValidation(false);
      setIsSuccess(false);
    }
  }, [value]);

  const ref = useRef(null);
  useEffect(() => {
    ref.current.addEventListener("focus", () => {
      setIsActive(true);
    });
    ref.current.addEventListener("blur", () => {
      setIsActive(false);
    });
  }, []);
  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      exit={{ opacity: 0, y: -10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      className={`${styles.componentBox}`}
      onClick={() => ref.current.focus()}
    >
      <span className={`${styles.label}`} onClick={() => ref.current.focus()}>
        {label}
      </span>
      <input
        className={`${styles.input} ${isActive ? styles.selected : ""} ${
          isSuccess && styles.success
        } ${hasError && styles.error}`}
        type={type}
        placeholder={placeholder}
        value={value}
        onChange={(e) => setValue(e.target.value)}
        ref={ref}
      />
    </motion.div>
  );
}
