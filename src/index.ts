import express from "express";
import { getRates } from "./helpers/rates";
import { Currency } from "../types/currency";
import rateLimit from "express-rate-limit";

const app = express();
const port = process.env.PORT || 3000;

// Define the rate limit rule
const apiLimiter = rateLimit({
  windowMs: 24 * 60 * 60 * 1000, // 1 day window
  max: 100, // Limit each IP to 100 requests per `window`
  standardHeaders: true, // Return rate limit info in the `RateLimit-*` headers
  legacyHeaders: false, // Disable the `X-RateLimit-*` headers
});

// Apply the rate limit to all requests
app.use(apiLimiter);

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
