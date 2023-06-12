import { useContext, useEffect, useState } from "react";
import { useRouter } from "next/router";
import Link from "next/link";
import useSWR from "swr";
import Image from "next/image";
import { fetchCoffeStores } from "@/lib/coffe-stores";
import { storeContext } from "@/context/store-context";
import { API_ENDPOINTS } from "@/constants/endpoint";

export const isEmpty = (obj) => {
  return obj && Object.keys(obj).length === 0;
};

export const fetcher = (url) => fetch(url).then((res) => res.json());

const CoffeeStore = (initialProps) => {
  const router = useRouter();
  if (router.isFallback) {
    <div>Loading....</div>;
  }

  const [coffeeStore, setCoffeeStore] = useState(initialProps.coffeeStore);
  const { id } = router.query;

  const {
    state: { coffeeStores },
  } = useContext(storeContext);

  const { address, name, imgUrl, formatted_address } = coffeeStore || {};

  const handleCreateCoffeeStore = async (coffeeStore) => {
    const { address, name, imgUrl, formatted_address } = coffeeStore || {};
    const data = {
      id,
      name,
      address: formatted_address || "",
      imgURL: imgUrl,
      neighbourhood: address || "",
      voting: 1,
    };
    try {
      await fetch(API_ENDPOINTS.CREATE_COFFEE_STORE, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });
    } catch (error) {
      console.log({ error });
    }
  };

  useEffect(() => {
    if (isEmpty(initialProps.coffeeStore)) {
      const coffeeStoreId = coffeeStores.find((item) => {
        return item.id === id;
      });
      if (coffeeStoreId) {
        setCoffeeStore(coffeeStoreId);
        handleCreateCoffeeStore(coffeeStoreId);
      }
    } else {
      handleCreateCoffeeStore(initialProps.coffeeStore);
    }
  }, [id, initialProps, initialProps.coffeeStore]);

  const [votingCount, setVotingCount] = useState(1);

  const { data, error } = useSWR(
    `${API_ENDPOINTS.GET_COFFEE_STORE}?id=${id}`,
    fetcher
  );
  const handleUpVoteButton = async () => {
    const data = { id };
    try {
      const response = await fetch(API_ENDPOINTS.UPDATE_COFFEE_STORE, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });
      const coffeeStore = await response.json();
      if (coffeeStore) {
        setVotingCount((prevState) => prevState + 1);
      }
    } catch (error) {
      console.log({ error });
    }
  };

  useEffect(() => {
    if (data && data.length > 0) {
      const newData = {
        ...data[0],
        address: data[0].neighbourhood || "",
        formatted_address: data[0].address || "",
      };
      setCoffeeStore(newData);
      setVotingCount(data[0].voting);
    }
  }, [data]);
  if (error) {
    return (
      <>
        <p>Something went Wrong</p>
        <Link to="/" className="btn btn-secondary">
          Go Home
        </Link>
      </>
    );
  }
  return (
    <div className="min-h-screen flex flex-col px-[5%] bg-gray-500">
      <div>
        <div className="py-12">
          <Link
            href="/"
            className="flex items-center text-white hover:text-black font-bold transition-all duration-200 ease-in-out fit-content"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
              height="24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M21 16.811c0 .864-.933 1.405-1.683.977l-7.108-4.062a1.125 1.125 0 010-1.953l7.108-4.062A1.125 1.125 0 0121 8.688v8.123zM11.25 16.811c0 .864-.933 1.405-1.683.977l-7.108-4.062a1.125 1.125 0 010-1.953L9.567 7.71a1.125 1.125 0 011.683.977v8.123z"
              />
            </svg>
            <span className="text-2xl"> Back to Home </span>
          </Link>
        </div>
        <div className="flex">
          <div className="h-[100%] w-[50%]">
            <Image
              className="w-[100%] h-[100%] object-cover"
              src={
                imgUrl ||
                "https://images.unsplash.com/photo-1504753793650-d4a2b783c15e?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=2000&q=80"
              }
              width={600}
              height={200}
              alt={name || "coffee-store"}
            />
          </div>
          <div className="p-12">
            <h1 className="text-3xl font-bold py-8">{name}</h1>
            <div className="flex py-4 items-center">
              <Image
                width={30}
                height={30}
                src="/static/icons/places.svg"
                alt="place"
                className="p-[2px] bg-blue-400 rounded-full"
              />
              <p className="px-2 font-semibold">{address}</p>
            </div>
            <div className="flex py-4 items-center">
              <Image
                width={30}
                height={30}
                src="/static/icons/nearMe.svg"
                alt="nearMe"
                className="p-[2px] bg-violet-400 rounded-full"
              />
              <p className="px-2 font-semibold">{formatted_address}</p>
            </div>
            <div className="flex py-4 items-center">
              <Image
                width={30}
                height={30}
                src="/static/icons/star.svg"
                alt="star"
                className="p-[2px] bg-yellow-300 rounded-full"
              />
              <p className="px-2 font-semibold">{votingCount}</p>
            </div>
            <button
              onClick={handleUpVoteButton}
              className="btn px-8 btn-light outline-4 duration-300 transition-all ease"
            >
              Up vote
            </button>
          </div>
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
