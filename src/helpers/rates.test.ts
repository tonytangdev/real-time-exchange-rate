import { API_URL, getRates } from "./rates";
import { Currency } from "../../types/currency";

const fetchMock = jest.spyOn(global, "fetch").mockImplementation(
  jest.fn(() =>
    Promise.resolve({
      json: () =>
        Promise.resolve({
          data: {
            AED: 3.67306,
            AFN: 91.80254,
            ALL: 108.22904,
            AMD: 480.41659,
          },
        }),
    })
  ) as jest.Mock
);

describe("getRates", () => {
  test("should make a call to the FreeCurrencyAPI", async () => {
    const baseCurrency = "EUR";
    const targetCurrencies: Currency[] = ["USD", "GBP"] as const;

    await getRates(baseCurrency, targetCurrencies);

    const url = `${API_URL}?apikey=${
      process.env.FREE_CURRENY_API_KEY
    }&base_currency=${baseCurrency}&currencies=${targetCurrencies.join(",")}`;

    expect(fetchMock).toHaveBeenCalledWith(url);
  });

  test("throw an error if any currency is not supported", async () => {
    const baseCurrency = "EUR";

    // @ts-expect-error
    const targetCurrencies: Currency[] = ["USD", "GBP", "ABC"] as const;

    await expect(
      getRates(baseCurrency, targetCurrencies)
    ).rejects.toThrow();
  });
});
