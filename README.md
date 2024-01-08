# Real Time Exchange Rate

[![License](https://img.shields.io/badge/license-MIT-blue.svg)](LICENSE)

## Overview
This Currency Conversion API provides a reliable and easy-to-use service for converting amounts from one currency to multiple. Utilizing up-to-date exchange rate data from trusted financial sources, this API is designed for applications that require currency conversion functionality, such as e-commerce platforms, financial software, and international transaction services.

I'm using [freecurrencyapi](https://freecurrencyapi.com/) to retrieve exchange rates data.

## Features
- **Real-time Currency Conversion**: Convert amounts between various currencies with real-time exchange rates.
- **Support for Multiple Currencies**: Extensive support for various international currencies.
- **Error Handling**: Robust error handling for unsupported currencies or network issues.
- **Rate Limiting**: Ensures fair usage and prevents abuse of the service.

## Getting Started

### Installation
1. Clone the repository:
   ```bash
   git clone https://github.com/tonytangdev/real-time-exchange-rate.git
   ```
2. Navigate to the project directory:
   ```bash
   cd real-time-exchange-rate
   ```
3. Install the dependencies:
   ```bash
   pnpm install
   ```

If you don't have `pnpm` installed, you can use `npm` or `yarn` instead.

### Running the API
To start the server, run:
```bash
pnpm dev
```
The API will be available at `http://localhost:3000`.

## Usage
To perform a currency conversion, make a POST request to `/convert` with the following parameters:

- `source_currency`: The three-letter currency code of the source currency (e.g., "USD").
- `target_currencies`: The three-letter currency code of the target currencies inside a list (e.g., ["EUR", "GBP", "JPY"]).
- `amount`: The amount to be converted.

Example request:
```
POST http://localhost:3000/convert
```
```json
{
  "source_currency": "USD",
  "target_currencies": ["EUR", "GBP", "JPY"],
  "amount": 100
}
```

## Contributing
Contributions are welcome! If you have suggestions for improvement or have found a bug, please open an issue or submit a pull request.

## License
This project is licensed under the [MIT License](LICENSE).

---

Feel free to customize this template according to your project's specifics, such as adding a section for API documentation or examples. A well-documented README significantly enhances the user experience and encourages collaboration.

## About me

I am Tony, a Lead Developer based in France. I am passionate about cloud computing, DevOps, and software development in general.
And also I like writing clean code and unit tests.

You can find me on [X](https://twitter.com/TonyTangdev)

