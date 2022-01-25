import axios from "axios";
import { getSession } from "next-auth/client";
import AWS from "aws-sdk";
import { v4 as uuidv4 } from "uuid";

/* bills payload for POST
 * {
 *    tableName: string,
 *    contact: string,
 *    due_date: string,
 *    date: string,
 *    reference: string,
 *    description: string,
 *    amount: string,
 *    account: string,
 *    attachment: string,
 *    is_paid: boolean
 * }
 **/

/* contact payload for PATCH
 * {
 *    tableName: string,
 *    id: string
 *    contact: string,
 *    due_date: string,
 *    date: string,
 *    reference: string,
 *    description: string,
 *    amount: string,
 *    account: string,
 *    attachment: string,
 *    is_paid: boolean
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

async function getSignedUrl(key, s3) {
  return new Promise((resolve, reject) => {
    let params = { Bucket: process.env.BUCKET_NAME, Key: key };
    s3.getSignedUrl("getObject", params, (err, url) => {
      if (err) reject(err);
      resolve(url);
    });
  });
}

export default async function handler(req, res) {
  const session = await getSession({ req });
  AWS.config.update({
    region: process.env.REGION,
  });

  const s3 = new AWS.S3();
  if (!session) return res.status(400).end(error);

  const BASE_URL = process.env.BILLS_API;

  switch (req.method) {
    case "GET":
      try {
        const { data } = await axios.get(BASE_URL, {
          params: {
            user_name: session.user.username,
          },
        });
        const bills = await Promise.all(
          data.bills.map(async (bill) => {
            const attachmentSignedUrl =
              bill.attachment && await getSignedUrl(bill.attachment, s3);
            return {
              ...bill,
              attachmentSignedUrl: attachmentSignedUrl,
            };
          })
        );
        res.status(200).json(bills);
      } catch (error) {
        console.log(error);
        res.status(400).end("ERROR WHEN GET BILLS");
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
        .then((response) => res.status(200).json("Item has been updated"))
        .catch((error) => res.status(error.status || 400).end(error));
      break;

    case "PATCH":
      let postBody = req.body;
      console.log(postBody.attachment.substring(0, 8));
      if (
        postBody.attachment &&
        postBody.attachment.substring(0, 10) == "data:image"
      ) {
        const decodedImg = Buffer.from(
          req.body.attachment.replace(/^data:image\/\w+;base64,/, ""),
          "base64"
        );
        const fileName = `${uuidv4()}.jpg`;
        const params = {
          Body: decodedImg,
          Bucket: process.env.BUCKET_NAME,
          Key: fileName,
          ContentType: "image/jpeg",
        };
        const response = await s3.upload(params).promise();
        postBody = {
          ...postBody,
          attachment: fileName,
        };
      }
      await axios
        .patch(BASE_URL, postBody)
        .then((data) => res.status(200).json("Item has been updated"))
        .catch((error) =>
          res.status(error.status || 400).end("Can not update bill")
        );
      break;

    case "POST":
      // Need to upload attachment first. Ideally we should do both together.
      //TODO Support upload and create in one call.
      try {
        let postBody = {
          ...req.body,
          user_name: session.user.username,
          is_paid: false,
        };
        if (postBody.attachment) {
          const decodedImg = Buffer.from(
            req.body.attachment.replace(/^data:image\/\w+;base64,/, ""),
            "base64"
          );
          // const decodedImg = new Buffer.from(req.body.attachment, "base64");
          const fileName = `${uuidv4()}.jpg`;
          const params = {
            Body: decodedImg,
            Bucket: process.env.BUCKET_NAME,
            Key: fileName,
            ContentType: "image/jpeg",
          };
          const response = await s3.upload(params).promise();
          postBody = {
            ...postBody,
            attachment: fileName,
          };
        }

        await axios.post(BASE_URL, postBody);
        res.status(200).send("Item has been added to the database");
      } catch (error) {
        console.log(error);
        res.status(error.status || 400).end("Can not create bill!");
      }
      break;
    default:
      res.status(400).end(error);
  }
}
