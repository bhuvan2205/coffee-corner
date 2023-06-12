import Banner from "@/components/Banner";
import Head from "next/head";
import Image from "next/image";
import Card from "../components/Card";
import { fetchCoffeStores } from "../lib/coffe-stores";
import useTrackLocation from "@/hooks/useTrackLocation";
import { useContext, useEffect, useState } from "react";
import { storeContext } from "@/context/store-context";
import ACTION_TYPES from "@/context/action";
import Footer from "@/components/Footer";

const Home = (props) => {
  const { state, dispatch } = useContext(storeContext);
  const { coffeeStores, latLong } = state;

  // const [coffeeStores, setCoffeeStores] = useState([]);
  const [error, setError] = useState("");
  const { handleTrackLocation, errorMsg, loading } = useTrackLocation();
  const handleClick = () => {
    handleTrackLocation();
  };

  useEffect(() => {
    const fetchData = async () => {
      if (latLong) {
        try {
          const res = await fetch(
            `api/getCoffeeStoresByLocation?limit=10&latLong=${latLong}`
          );

          const coffeeStores = await res.json();

          dispatch({
            type: ACTION_TYPES.SET_COFFEE_STORES,
            payload: { coffeeStores },
          });
          setError("");
        } catch (error) {
          setError(error);
        }
      }
    };
    fetchData();
  }, [latLong]);

  return (
    <>
      <Head>
        <title>Coffe Corner App</title>
        <meta name="description" content="Generated by create next app" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main className="pb-20">
        <Banner
          buttonText={loading ? "Locating...." : "View stores nearby"}
          handleClick={handleClick}
          loading={loading}
        />
        {errorMsg && (
          <p>
            Something went wrong: <b>{errorMsg}</b>
          </p>
        )}
        {error && (
          <p>
            Something went wrong: <b>{error}</b>
          </p>
        )}
        <div>
          {coffeeStores.length > 0 && (
            <div className="px-14">
              <h2 className="text-4xl uppercase font-bold py-12">
                Stores near you
                <div className="bg-black h-[6px] w-[150px] rounded-lg m-1" />
              </h2>
              <div className="grid md:grid-cols-3 gap-24 mx-auto w-full place-items-center">
                {coffeeStores.map((item) => {
                  return (
                    <Card
                      href={`${item.id}`}
                      imgUrl={
                        item.imgUrl ||
                        "https://images.unsplash.com/photo-1504753793650-d4a2b783c15e?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=2000&q=80"
                      }
                      name={item.name}
                      key={item.id}
                    />
                  );
                })}
              </div>
            </div>
          )}
          {props.coffeeStores.length > 0 && (
            <div className="px-14">
              <h2 className="text-4xl uppercase font-bold py-12">
                Tanjore stores
                <div className="h-[6px] w-[150px] bg-black rounded-lg m-1" />
              </h2>
              <div className="grid md:grid-cols-3 gap-24 mx-auto w-full place-items-center">
                {props.coffeeStores.map((item) => {
                  return (
                    <Card
                      href={`${item.id}`}
                      imgUrl={
                        item.imgUrl ||
                        "https://images.unsplash.com/photo-1504753793650-d4a2b783c15e?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=2000&q=80"
                      }
                      name={item.name}
                      key={item.id}
                    />
                  );
                })}
              </div>
            </div>
          )}
        </div>
      </main>
      <Footer />
    </>
  );
};

export async function getStaticProps(context) {
  const coffeeStores = await fetchCoffeStores();
  return {
    props: {
      coffeeStores,
    },
  };
}

export default Home;
