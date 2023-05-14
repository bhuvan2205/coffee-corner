import ACTION_TYPES from "@/context/action";
import { storeContext } from "@/context/store-context";
import { useContext, useState } from "react";

const useTrackLocation = () => {
  const { dispatch } = useContext(storeContext);
  const [errorMsg, setErrorMsg] = useState();
  // const [latLong, setLatLong] = useState();
  const [loading, setLoading] = useState(false);
  const success = (position) => {
    const latitude = position.coords.latitude;
    const longitude = position.coords.longitude;
    // setLatLong(`${latitude},${longitude}`);
    dispatch({
      type: ACTION_TYPES.SET_LAT_LONG,
      payload: { latLong: `${latitude},${longitude}` },
    });
    setLoading(false);
    setErrorMsg("");
  };
  const error = () => {
    setLoading(false);
    setErrorMsg("Unable to retrieve your location");
  };
  const handleTrackLocation = () => {
    setLoading(true);
    if (!navigator.geolocation) {
      setErrorMsg("Geolocation is not supported by your browser");
      setLoading(false);
    } else {
      navigator.geolocation.getCurrentPosition(success, error);
    }
  };
  return {
    // latLong,
    errorMsg,
    loading,
    handleTrackLocation,
  };
};

export default useTrackLocation;
