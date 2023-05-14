import React, { useContext } from "react";
import style from "../styles/Banner.module.css";
import { storeContext } from "@/context/store-context";

const Banner = ({ buttonText, handleClick }) => {
  const {
    state: { coffeeStores },
  } = useContext(storeContext);

  return (
    <div className={style.container}>
      <h1 className={style.title}>
        <span className={style.title1}>Coffee</span>
        <span className={style.title2}>Corner</span>
      </h1>
      <p className={style.subTitle}>Discover your local coffee shops!</p>
      <div className={style.buttonWrapper}>
        {coffeeStores.length === 0 && (
          <button className={style.button} onClick={handleClick}>
            {buttonText}
          </button>
        )}
      </div>
    </div>
  );
};

export default Banner;
