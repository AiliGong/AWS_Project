import axios from "axios";
export default async (req, res) => {
  try {
    const {
      data: { aud },
    } = await axios.get(
      "https://cdn.jsdelivr.net/gh/fawazahmed0/currency-api@1/latest/currencies/aud.json"
    );
    res.status(200).json([
      { key: "AUD:USD", value: aud.usd },
      { key: "AUD:EUR", value: aud.eur },
      { key: "AUD:CNY", value: aud.cny },
      { key: "AUD:JYP", value: aud.jpy },
      { key: "AUD:NZD", value: aud.nzd }
    ]);
  } catch (error) {
    res.status(400).end(error);
  }
};
