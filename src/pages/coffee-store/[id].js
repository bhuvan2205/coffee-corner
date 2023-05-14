import { useContext, useEffect, useState } from "react";
import { useRouter } from "next/router";
import Link from "next/link";
import styles from "../../styles/Coffee-store.module.css";
import Image from "next/image";
import { fetchCoffeStores } from "../../../lib/coffe-stores";
import { storeContext } from "@/context/store-context";

const CoffeeStore = (initialProps) => {
  const router = useRouter();
  if (router.isFallback) {
    <div>Loading....</div>;
  }

  const [coffeeStore, setCoffeeStore] = useState(initialProps.coffeeStore);
  console.log(coffeeStore);
  const id = router.query.id;

  const {
    state: { coffeeStores },
  } = useContext(storeContext);

  const handleUpVoteButton = () => {
    console.log("Btn clicked");
  };

  const { address, name, imgUrl, formatted_address } = coffeeStore || {};
  useEffect(() => {
    if (Object.keys(coffeeStore).length == 0 && coffeeStores.length > 0) {
      const coffeeStoreId = coffeeStores.find((item) => {
        return item.id === id;
      });
      setCoffeeStore(coffeeStoreId);
    }
  }, [id]);
  return (
    <div className={styles.layout}>
      <h1>Coffee Store Page</h1>
      <div className={styles.container}>
        <div className={styles.col1}>
          <div className={styles.backToHomeLink}>
            <Link href="/">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="currentColor"
                className="w-6 h-6"
                height="16"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M21 16.811c0 .864-.933 1.405-1.683.977l-7.108-4.062a1.125 1.125 0 010-1.953l7.108-4.062A1.125 1.125 0 0121 8.688v8.123zM11.25 16.811c0 .864-.933 1.405-1.683.977l-7.108-4.062a1.125 1.125 0 010-1.953L9.567 7.71a1.125 1.125 0 011.683.977v8.123z"
                />
              </svg>
              Back to Home
            </Link>
          </div>
          <div className={styles.nameWrapper}>
            <h1 className={styles.name}>{name}</h1>
          </div>
          <Image
            src={
              imgUrl ||
              "https://images.unsplash.com/photo-1504753793650-d4a2b783c15e?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=2000&q=80"
            }
            width={600}
            height={200}
            alt={name || "coffee-store"}
            className={styles.storeImg}
          />
        </div>
        <div className={`glass ${styles.col2}`}>
          <div className={styles.iconWrapper}>
            <Image
              width={24}
              height={24}
              src="/static/icons/places.svg"
              alt="place"
            />
            <p className={styles.text}>{address}</p>
          </div>
          <div className={styles.iconWrapper}>
            <Image
              width={24}
              height={24}
              src="/static/icons/nearMe.svg"
              alt="nearMe"
            />
            <p className={styles.text}>{formatted_address}</p>
          </div>
          <div className={styles.iconWrapper}>
            <Image
              width={24}
              height={24}
              src="/static/icons/star.svg"
              alt="star"
            />
            <p className={styles.text}>{1}</p>
          </div>
          <button className={styles.upvoteButton} onClick={handleUpVoteButton}>
            Up vote
          </button>
        </div>
      </div>
    </div>
  );
};

export async function getStaticProps(context) {
  const { params } = context;
  const coffeeStores = await fetchCoffeStores();
  const CoffeeStore = coffeeStores.find((item) => {
    return item.id.toString() === params.id;
  });
  return {
    props: {
      coffeeStore: CoffeeStore ? CoffeeStore : {},
    },
  };
}

export async function getStaticPaths() {
  const coffeeStores = await fetchCoffeStores();
  const paths = coffeeStores.map((item) => ({
    params: { id: `${item.id}` },
  }));

  return {
    paths,
    fallback: true,
  };
}

export default CoffeeStore;
