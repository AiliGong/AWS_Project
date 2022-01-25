import axios from "axios";
import { getSession } from "next-auth/client";
import _ from "lodash";

/* bills payload for POST
 * {
 *    tableName: string,
 *    id: string,
 *    name: string,
 *    user_name: string
 * }
 **/

/* contact payload for PATCH
 * {
 *    tableName: string,
 *    id: string,
 *    name: string,
 *    user_name: string
 * }
 **/

/* contact payload for DELETE
 * {
 *   id: string
 * }
 **/

/* contact payload for GET
 * {
 *   id?: string
 * }
 **/

export default async function handler(req, res) {
  const session = await getSession({ req });
  if (!session) return res.status(400).end(error);

  const BASE_URL = process.env.ACCOUNTS_API;

  switch (req.method) {
    case "GET":
      const account_id = req.query.id;
      const url = account_id ? `${BASE_URL}/${account_id}` : BASE_URL;
      axios
        .get(url, {
          params: {
            user_name: session.user.username,
          },
        })
        .then(({ data }) => {
          res.status(200).json(data.accounts);
        })
        .catch((error) => res.status(error.status || 400).end(error));

      break;

    case "DELETE":
      await axios
        .delete(BASE_URL, {
          data: {
            id: req.body.id,
            user_name: session.user.username,
          },
        })
        .then((response) => {
          res.status(200).json("Item has been deleted");
        })
        .catch((error) => {
          res.status(error.status || 400).end(error);
        });
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
        user_name: session.user.username,
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
