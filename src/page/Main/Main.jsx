import React from "react";
import {
  TbArrowAutofitDown,
  TbAppWindow,
  TbArticle,
  TbBadges,
} from "react-icons/tb";

import classNames from "classnames";

import { Link } from "react-router-dom";

import styles from "./Main.module.css";

const Main = () => {
  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <h1 className={styles.heading}>Welcome to Manage&Backup</h1>
        <p className={styles.subheading}>
          Your secure and reliable file storage solution.
        </p>
      </div>

      <div className={styles.boxes}>
        <div className={styles.section}>
          <div className={styles.tytleWrapper}>
            <TbArrowAutofitDown size={44} />
            <h2 className={styles.sectionHeading}>File Management</h2>
          </div>
          <p className={styles.text}>
            Easily upload, organize, and access your files from anywhere in the
            world. With our intuitive interface, managing your digital life has
            never been easier.
          </p>
        </div>

        <div className={styles.section}>
          <div className={styles.tytleWrapper}>
            <TbAppWindow size={44} />
            <h2 className={styles.sectionHeading}>Top-Notch Security</h2>
          </div>
          <p className={styles.text}>
            Your privacy is our priority. We use state-of-the-art encryption and
            security protocols to ensure that your files are protected at all
            times.
          </p>
        </div>

        <div className={styles.section}>
          <div className={styles.tytleWrapper}>
            <TbArticle size={44} />
            <h2 className={styles.sectionHeading}>Unlimited Access</h2>
          </div>

          <p className={styles.text}>
            Access your files anytime, on any device. Whether you're on your
            phone, tablet, or computer, your files are just a click away.
          </p>
        </div>

        <div className={styles.section}>
          <div className={styles.tytleWrapper}>
            <TbBadges size={44} />
            <h2 className={styles.sectionHeading}>Share with Ease</h2>
          </div>

          <p className={styles.text}>
            Share files and folders with colleagues, friends, or family with
            just a few clicks. Set permissions to control who can view or edit
            your content.
          </p>
        </div>
      </div>
      <div className={styles.boxBtn}>
        <Link to="/login" className={styles.link}>
          <button className={classNames(styles.btn, styles.link)}>
            Get Login Now
          </button>
        </Link>
        <Link to="/register" className={styles.btn}>
          <button className={classNames(styles.btn, styles.link)}>
            Get Register Now
          </button>
        </Link>
      </div>
      <div className={styles.footer}>
        Netology &copy; {new Date().getFullYear()}
      </div>
    </div>
  );
};

export default Main;
