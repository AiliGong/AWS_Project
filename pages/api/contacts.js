import axios from "axios";
import { getSession } from "next-auth/client";
import _ from "lodash";

/* contact payload for POST
 * {
 *   tableName: string,
 *   name: string,
 *   address: string,
 *   email: string,
 *   contact_number: string,
 *   bank_account: string,
 *   user_name: string
 * }
 **/

/* contact payload for PATCH
 * {
 *   tableName: string,
 *   id: string,
 *   name: string,
 *   address: string,
 *   email: string,
 *   contact_number: string,
 *   bank_account: string,
 *   user_name: string
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

  const BASE_URL = process.env.CONTACTS_API;

  switch (req.method) {
    case "GET":
      const contact_id = req.query.id;
      if (!contact_id) {
        await axios
          .get(BASE_URL, {
            params: {
              user_name: session.user.username,
            },
          })
          .then(({ data }) => {
            res.status(200).json(data.contacts);
          })
          .catch((error) => res.status(error.status || 400).end(error));
      } else {
        await axios
          .get(`${BASE_URL}/${contact_id}`)
          .then(({ data }) => {
            res.status(200).json(data.contacts[0]);
          })
          .catch((error) => res.status(error.status || 400).end(error));
      }
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
      // const body = JSON.parse(req.body);
      const post_body = {
        ...req.body,
        user_name: session.user.username,
      };
      await axios
        .post(BASE_URL, post_body)
        .then((data) => {
          console.log(data);
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
