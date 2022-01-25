import axios from "axios";
import { getSession } from "next-auth/client";

/* transaction payload for POST
 * {
 *
 *   tableName: string,
 *   id: string
 *   contact: Contact
 *   date: string
 *   reference: string,
 *   description: string,
 *   category: string,
 *   amount: string,
 *   account: Account,
 *   user_name: string,
 *   bill: string
 * }
 **/

/* transaction payload for PATCH
 * {
 *   tableName: string,
 *   id: string
 *   contact: Contact
 *   date: string
 *   reference: string,
 *   description: string,
 *   category: string,
 *   amount: string,
 *   account: Account,
 *   user_name: string,
 *   bill: string
 * }
 **/

/* transaction payload for DELETE
 * {
 *   id: string
 * }
 **/

/* transaction payload for GET
 * {
 *   id?: string
 * }
 **/

export default async function handler(req, res) {
  const session = await getSession({ req });
  if (!session) return res.status(400).end(error);
  const username = session.user.username;
  const BASE_URL = process.env.TRANSACTIONS_API;
  const BILL_URL = process.env.BILLS_API;

  const unpayBill = (bill) => {
    const data = {
      id: bill,
      is_paid: false,
      user_name: username,
    };
    axios
      .patch(`${BILL_URL}/paybill`, data)
      .then((response) => {
        res.status(200).json("Item has been deleted");
      })
      .catch((error) => {
        res.status(error.status || 400).end(error);
      });
  };
  switch (req.method) {
    case "GET":
      const type = req.query.type;
      const url = type ? `${BASE_URL}/${type}` : BASE_URL;
      await axios
        .get(url, {
          params: {
            user_name: username,
          },
        })
        .then(({ data }) => {
          res.status(200).json(data.transactions);
        })
        .catch((error) => res.status(error.status || 400).end(error));
      break;

    case "DELETE":
      //if expense is related to a bill, mark the bill as unpaid after deletion
      const bill = req.body.bill;
      await axios
        .delete(BASE_URL, {
          data: {
            id: req.body.id,
            user_name: username,
          },
        })
        .then((response) => {
          if (bill) {
            unpayBill(bill);
          } else {
            res.status(200).json("Item has been deleted");
          }
        })
        .catch((error) => res.status(error.status || 400).end(error));
      break;

    case "PATCH":
      await axios
        .patch(BASE_URL, req.body)
        .then((data) => {
          res.status(200).json("Item has been updated");
        })
        .catch((error) => {
          res.status(error.status || 400).end(error);
        });
      break;

    case "POST":
      const post_body = {
        ...req.body,
        user_name: username,
      };
      await axios
        .post(BASE_URL, post_body)
        .then((data) => {
          res.status(200).send("Item has been added to the database");
        })
        .catch((error) => {
          res.status(error.status || 400).end(error);
        });
      break;

    default:
      res.status(400).end(error);
  }
}
