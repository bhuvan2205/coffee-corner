import { fetchCoffeStores } from "../../lib/coffe-stores";

const handler = async (req, res) => {
  const { latLong, limit } = req.query;
  try {
    const response = await fetchCoffeStores(latLong, limit);
    res.status(200).json(response);
  } catch (error) {
    res.status(400).json(error);
  }
};

export default handler;
