import axios from "axios";

export default async function handler(req, res) {
  const access_key = process.env.NUM_VERIFY;
  const BASE_URL = "http://apilayer.net/api/validate";
  if (req.method === "GET") {
    try {
      const { data } = await axios.get(BASE_URL, {
        params: {
          access_key,
          number: req.query.number,
          format: 1,
        },
      });
      return res.status(200).json(data);
    } catch (error) {
      console.log(error);
    }
  }
}
