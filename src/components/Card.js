import Image from "next/image";
import Link from "next/link";
import React from "react";
import styles from "../styles/Card.module.css";

const Card = (props) => {
  return (
    <Link href={`coffee-store/${props.href}`} className={styles.cardLink}>
      <div className={`${styles.container} glass`}>
        <div className={styles.cardHeader}>
          <h2>{props.name}</h2>
        </div>
        <div className={styles.cardImageWrapper}>
          <Image
            alt="coffee-store"
            src={props.imgUrl || "https://images.unsplash.com/photo-1504753793650-d4a2b783c15e?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=2000&q=80"}
            width={200}
            height={160}
            className={styles.img}
          />
        </div>
      </div>
    </Link>
  );
};

export default Card;
