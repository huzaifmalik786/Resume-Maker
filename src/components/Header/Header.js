import React from 'react';
import styles from "./Header.module.css";
import cvsvg from "../../assets/cv.svg";

function Header() {
  return (
    <div className={styles.header}>
        <div className={styles.left}>
            <p className={styles.heading}>
                A <span>Resume</span> that stands out!
            </p>
            <p className={styles.heading}>
                Make your own Resume. <span>It's Free!</span>
            </p>
        </div>
        <div className={styles.right}>
            <img src={cvsvg} alt="Resume"/>
        </div>
    </div>
  )
}

export default Header