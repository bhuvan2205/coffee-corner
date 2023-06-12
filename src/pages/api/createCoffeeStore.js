import table from "../../lib/airtable";

const handler = async (req, res) => {
  switch (req.method) {
    case "POST":
      const { id, name } = req.body || {};
      try {
        // find a record
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
          // create a record

          if (id && name) {
            const records = await table.create([
              {
                fields: req.body,
              },
            ]);
            const CoffeeStores = records.map((item) => {
              return { ...item.fields };
            });

            return res.status(201).json(CoffeeStores);
          } else {
            return res
              .status(400)
              .json({ Error: "Id or name is miising from the user" });
          }
        }
      } catch (error) {
        return res.status(500).json({ message: error });
      }
    default:
      res.json({ msg: "You need to use Post method to create Coffestores" });
  }
};

export default handler;
