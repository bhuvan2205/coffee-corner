import table from "@/lib/airtable";

const handler = async (req, res) => {
  switch (req.method) {
    case "PATCH": {
      try {
        const { id } = req.body;
        if (id) {
          // Get info from airtable
          const findCoffeeStore = await table
            .select({
              filterByFormula: `id='${id}'`,
            })
            .firstPage();
          if (!!findCoffeeStore.length) {
            const CoffeeStores = findCoffeeStore.map((item) => {
              return { recordId: item.id, ...item.fields };
            });
            const record = CoffeeStores[0];
            const newVoting = parseInt(record.voting) + 1;

            // Update a record

            const updatedRecord = await table.update([
              {
                id: record.recordId,
                fields: {
                  voting: newVoting,
                },
              },
            ]);
            if (updatedRecord) {
              const CoffeeStores = updatedRecord.map((item) => {
                return { ...item.fields };
              });
              return res.json({ CoffeeStores });
            }
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
        msg: "You need to use Patch method to update Coffestore",
      });
    }
  }
};

export default handler;
