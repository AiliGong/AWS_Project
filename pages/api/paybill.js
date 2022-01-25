import axios from "axios";
import { getSession } from "next-auth/client";

export default async function handler(req, res) {
  const session = await getSession({ req });
  if (!session) return res.status(400).end(error);

  const TRANSACTIONS_URL = process.env.TRANSACTIONS_API;
  const BILL_URL = process.env.BILLS_API;

  const addExpense = (data) => {
    data = {
      ...data,
      category: "expense",
      bill: data.id,
    };
    axios
      .post(TRANSACTIONS_URL, data)
      .then((data) => {
        res.status(200).json("ok");
      })
      .catch((error) => {
        res.status(error.status || 400).end(error);
      });
  };

  // step 1. mark the bill as paid
  if (req.method == "POST") {
    const data = req.body;
    var bill_info = {
      ...data,
      is_paid: true,
    };
    await axios
      .patch(`${BILL_URL}/paybill`, bill_info)
      .then(({ data }) => {
        //step 2. add expense
        addExpense(bill_info);
      })
      .catch((error) => res.status(error.status || 400).end(error));
  } else {
    res.status(400).end(error);
  }
}
