import React, { useContext } from "react";
import { storeContext } from "@/context/store-context";

const Banner = ({ buttonText, handleClick, loading }) => {
  const {
    state: { coffeeStores },
  } = useContext(storeContext);

  return (
    <>
      <div className="flex flex-wrap shadow-lg">
        <div className="w-full sm:w-8/12 mb-10">
          <div className="container mx-auto h-full sm:p-10">
            <nav className="flex px-4 justify-between items-center">
              <div className="text-4xl font-bold">
                Coffee<span className="text-red-800">.</span>
              </div>
              <div>
                <img
                  src="https://image.flaticon.com/icons/svg/497/497348.svg"
                  alt=""
                  className="w-8"
                />
              </div>
            </nav>
            <header className="container px-4 lg:flex mt-10 items-center h-full lg:mt-0">
              <div className="w-full">
                <h1 className="text-4xl lg:text-6xl font-bold">
                  Find your <span className="text-red-800">Coffee</span> stores
                  near your location
                </h1>
                <div className="w-20 h-2 bg-red-800 my-4"></div>
                <p className="text-xl mb-10">
                  Step into our warm and inviting space, designed to foster a
                  sense of community and relaxation. Whether you're catching up
                  with friends, seeking a cozy spot to work, or simply taking a
                  moment for yourself, our comfortable seating areas provide the
                  perfect ambiance to savor your favorite coffee creations.
                </p>

                {coffeeStores.length === 0 && (
                  <>
                    {loading ? (
                      <div className="animate-bounce bg-white dark:bg-slate-800 p-2 w-12 h-12 ring-1 ring-slate-900/5 dark:ring-slate-200/20 shadow-lg rounded-full flex items-center justify-center">
                        <svg
                          className="w-6 h-6 text-red-900"
                          fill="none"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth="4"
                          viewBox="0 0 24 24"
                          stroke="currentColor"
                        >
                          <path d="M19 14l-7 7m0 0l-7-7m7 7V3"></path>
                        </svg>
                      </div>
                    ) : (
                      <button
                        onClick={handleClick}
                        className="bg-red-800 text-white text-2xl font-medium px-4 py-2 rounded shadow"
                      >
                        {buttonText}
                      </button>
                    )}
                  </>
                )}
              </div>
            </header>
          </div>
        </div>
        <img
          src="https://images.pexels.com/photos/977841/pexels-photo-977841.jpeg?auto=compress&cs=tinysrgb&w=600"
          alt="Leafs"
          className="w-full h-48 object-cover sm:h-screen sm:w-4/12"
        />
      </div>
    </>
  );
};

export default Banner;
