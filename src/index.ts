import express from "express";
import { getRates } from "./helpers/rates";
import { Currency } from "../types/currency";

const app = express();
const port = process.env.PORT || 3000;

// Middleware to parse json body
app.use(express.json());

// request example : http://localhost:3000/convert
// body example : {
//   "baseCurrency": "EUR",
//   "targetCurrencies": ["USD", "GBP"],
//   "amount": 10
// }
app.post("/convert", async (req, res) => {
  try {
    const { baseCurrency, targetCurrencies, amount } = req.body as {
      baseCurrency: Currency;
      targetCurrencies: Currency[];
      amount: number;
    };

    const rates = await getRates(baseCurrency, targetCurrencies);

    const convertedAmounts = targetCurrencies.map((curr) => ({
      currency: curr,
      amount: amount * rates[curr],
    }));

    res.json(convertedAmounts);
  } catch (error) {
    console.error(error);
    if (error instanceof Error)
      return res.status(400).json({ error: error.message });
    return res.status(500).json({ error: "Something went wrong" });
  }
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
