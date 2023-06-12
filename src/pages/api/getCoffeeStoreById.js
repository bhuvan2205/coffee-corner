import table from "@/lib/airtable";

const handler = async (req, res) => {
  switch (req.method) {
    case "GET": {
      try {
        const { id } = req.query;
        if (id) {
          // Get info from airtable
          const findCoffeeStore = await table
            .select({
              filterByFormula: `id='${id}'`,
            })
            .firstPage();
          if (!!findCoffeeStore.length) {
            const CoffeeStores = findCoffeeStore.map((item) => {
              return { ...item.fields };
            });
            return res.json(CoffeeStores);
          } else {
            return res
              .status(400)
              .json({ msg: "Coffeestore is not available" });
          }
        } else {
          return res.status(400).json({ msg: "Id is missing" });
        }
      } catch (error) {
        res.json({
          msg: "Something went wrong",
          error,
        });
      }
    }
    default: {
      res.json({
        msg: "You need to use Get method to retrieve Coffestore data",
      });
    }
  }
};

export default handler;
