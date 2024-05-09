<!-- markdownlint-disable-next-line -->
<p align="center">
  <a href="https://seifradwane.com/" rel="noopener" target="_blank"><img 
  width='280' src="https://media.publit.io/file/paymob-logo.webp" alt="Paymob Logo"></a>
</p>

<p align="center">
  <img src="https://img.shields.io/badge/React-61DAFB?style=flat-square&logo=react&logoColor=black" alt="React">
  <img src="https://img.shields.io/badge/TypeScript-3178C6?style=flat-square&logo=typescript&logoColor=white" alt="TypeScript">
  <img src="https://img.shields.io/badge/License-MIT-blue.svg?style=flat-square" alt="License">
</p>

Paymob React 💳 is a lightweight package designed to streamline online payment integration with Paymob services. It's built using React and TypeScript, providing a seamless development experience for incorporating secure payment functionality into your web applications.

## Installation 🔨

To install Paymob React, use npm or yarn:

```bash
npm install paymob-react
# or
yarn add paymob-react
```

## Usage

### Card Payment 💳

```typescript
import { startCardProcess } from "paymob-react";

// Define payment details
const paymentDetails = {
  amount: 100, // Example amount
  currency: "EGP",
  name: "Product Name",
  description: "Description of the product",
  quantity: "1",
  firstName: "John",
  lastName: "Doe",
  email: "john.doe@example.com",
  phoneNumber: "+1234567890",
  extraDescription: "Extra description",
  city: "City",
  floor: "Floor",
  building: "Building",
  postalCode: "12345",
  paymobApiKey: "your_paymob_api_key",
  cardIntegrationId: "your_card_integration_id",
  iframeId: "your_iframe_id",
  address: {
    // Address object
    street: "123 Main St",
    city: "City",
    state: "State",
    country: "Country",
    postalCode: "12345",
  },
};

// Start card payment process
startCardProcess(paymentDetails)
  .then(() => {
    console.log("Card payment process started successfully.");
  })
  .catch((error) => {
    console.error("Error starting card payment process:", error);
  });
```

### Wallet Payment 💸

```typescript
import { startWalletProcess } from "paymob-react";

// Define payment details
const paymentDetails = {
  amount: 100, // Example amount
  currency: "EGP",
  name: "Product Name",
  description: "Description of the product",
  quantity: "1",
  firstName: "John",
  lastName: "Doe",
  email: "john.doe@example.com",
  phoneNumber: "+1234567890",
  extraDescription: "Extra description",
  city: "City",
  floor: "Floor",
  building: "Building",
  postalCode: "12345",
  paymobApiKey: "your_paymob_api_key",
  cardIntegrationId: "your_card_integration_id",
  iframeId: "your_iframe_id",
  address: {
    // Address object
    street: "123 Main St",
    city: "City",
    state: "State",
    country: "Country",
    postalCode: "12345",
  },
  mobileNumber: "your_mobile_number",
};

// Start wallet payment process
startWalletProcess(paymentDetails)
  .then(() => {
    console.log("Wallet payment process started successfully.");
  })
  .catch((error) => {
    console.error("Error starting wallet payment process:", error);
  });
```

## How to Contribute 🤝

Contributions to Paymob React are welcome! Here's how you can contribute:

1. Fork the repository.
2. Create a new branch for your feature or bug fix.
3. Make your changes and commit them.
4. Push your changes to your fork.
5. Submit a pull request to the main repository.

## License ⚖️

This project is licensed under the MIT License. See the [LICENSE](LICENSE) file for details.

## Support

For any questions or issues, please [open an issue](https://github.com/seifeldinio/paymob-react/issues) on GitHub.
