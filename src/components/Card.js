import Image from "next/image";
import Link from "next/link";
import React from "react";

const Card = (props) => {
  return (
    <>
      <div className="card card-compact w-68 md:w-96 bg-base-100 shadow-2xl overflow-hidden rounded">
        <Image
          alt="coffee-store"
          className="h-40 md:h-60 w-96 object-cover"
          src={
            props.imgUrl ||
            "https://images.unsplash.com/photo-1504753793650-d4a2b783c15e?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=2000&q=80"
          }
          width={300}
          height={400}
        />
        <div className="card-body">
          <h2 className="card-title min-h-[50px]">{props.name}</h2>
          <div className="card-actions justify-start">
            <Link
              className="bg-red-800 text-white text-2xl font-medium px-4 py-2 rounded shadow"
              href={`coffee-store/${props.href}`}
            >
              View Store
            </Link>
          </div>
        </div>
      </div>
    </>
  );
};

export default Card;
