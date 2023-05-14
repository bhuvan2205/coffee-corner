import { createApi } from "unsplash-js";

const unsplash = createApi({
  accessKey: process.env.NEXT_PUBLIC_UNSPLASH_ACCESS_KEY,
});

const getCoffeStores = (latLong, query, limit) => {
  return `https://api.foursquare.com/v3/places/search?query=${query}ll=${latLong}&limit=${limit}`;
};

const getCoffeStoreImageUrls = async () => {
  const photos = await unsplash.search.getPhotos({
    query: "coffee stores",
    page: 1,
    perPage: 6,
  });
  return photos.response.results.map((result) => result.urls["small"]);
};

export const fetchCoffeStores = async (
  latLong = "10.421961,2C79.319612",
  limit = 6
) => {
  const photoUrls = await getCoffeStoreImageUrls();
  const options = {
    method: "GET",
    headers: {
      accept: "application/json",
      Authorization: process.env.NEXT_PUBLIC_FOUR_SQUARE_KEY,
    },
  };

  const res = await fetch(getCoffeStores(latLong, "coffee", limit), options);
  const data = await res.json();

  return data.results.map((result, index) => {
    return {
      id: result.fsq_id,
      name: result.name,
      address: result.location.address ? result.location.address : "",
      formatted_address: result.location.region
        ? result.location.formatted_address
        : "",
      imgUrl: photoUrls[index],
    };
  });
};
