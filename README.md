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
import React from "react";
import { startCardProcess } from "paymob-react"; // Import the startCardProcess function

function CardPaymentExample() {
  // Define payment details for card payment
  const paymentDetails = {
    amount: 1000, // Replace with the amount in your currency (e.g., 1000 for 10.00 EGP)
    currency: "EGP", // Replace with your currency code (e.g., "EGP" for Egyptian Pound)
    courseTitle: "Product Name", // Replace with the name of your product or course
    courseDescription: "Description of the product", // Replace with the description of your product or course
    firstName: "John", // Replace with the first name of the customer
    lastName: "Doe", // Replace with the last name of the customer
    email: "john.doe@example.com", // Replace with the email address of the customer
    phoneNumber: "+1234567890", // Replace with the phone number of the customer (including country code)
    userId: 123456, // Replace with a unique identifier for the customer (e.g., user ID)
    courseId: 789012, // Replace with a unique identifier for the course or product
    paymobApiKey: "your_paymob_api_key", // Replace with your Paymob API key
    cardIntegrationId: 1984360, // Replace with the ID of your card integration
    iframeId: 369734, // Replace with the ID of your iframe
  };

  // Function to handle card payment
  const handleCardPayment = async () => {
    try {
      // Start the card payment process
      await startCardProcess(
        paymentDetails.amount,
        paymentDetails.currency,
        paymentDetails.courseTitle,
        paymentDetails.courseDescription,
        paymentDetails.firstName,
        paymentDetails.lastName,
        paymentDetails.email,
        paymentDetails.phoneNumber,
        paymentDetails.userId,
        paymentDetails.courseId,
        paymentDetails.paymobApiKey,
        paymentDetails.cardIntegrationId,
        paymentDetails.iframeId
      );
      console.log("Card payment process started successfully.");
    } catch (error) {
      console.error("Error starting card payment process:", error);
    }
  };

  return (
    <div>
      <h1>Card Payment Example</h1>
      <button onClick={handleCardPayment}>Start Card Payment</button>
    </div>
  );
}

export default CardPaymentExample;
```

### Wallet Payment 💸

```typescript
import React from "react";
import { startWalletProcess } from "paymob-react"; // Import the startWalletProcess function

function WalletPaymentExample() {
  // Define payment details for wallet payment
  const walletPaymentDetails = {
    amount: 1000, // Replace with the amount in your currency (e.g., 1000 for 10.00 EGP)
    currency: "EGP", // Replace with your currency code (e.g., "EGP" for Egyptian Pound)
    courseTitle: "Product Name", // Replace with the name of your product or course
    courseDescription: "Description of the product", // Replace with the description of your product or course
    firstName: "John", // Replace with the first name of the customer
    lastName: "Doe", // Replace with the last name of the customer
    email: "john.doe@example.com", // Replace with the email address of the customer
    phoneNumber: "+1234567890", // Replace with the phone number of the customer (including country code)
    userId: 123456, // Replace with a unique identifier for the customer (e.g., user ID)
    courseId: 789012, // Replace with a unique identifier for the course or product
    paymobApiKey: "your_paymob_api_key", // Replace with your Paymob API key
    walletIntegrationId: 1996357, // Replace with the ID of your wallet integration
    iframeId: 369734, // Replace with the ID of your iframe
    mobileNumber: "01010101010", // Replace with the mobile number associated with the wallet
  };

  // Function to handle wallet payment
  const handleWalletPayment = async () => {
    try {
      // Start the wallet payment process
      await startWalletProcess(
        walletPaymentDetails.amount,
        walletPaymentDetails.currency,
        walletPaymentDetails.courseTitle,
        walletPaymentDetails.courseDescription,
        walletPaymentDetails.firstName,
        walletPaymentDetails.lastName,
        walletPaymentDetails.email,
        walletPaymentDetails.phoneNumber,
        walletPaymentDetails.userId,
        walletPaymentDetails.courseId,
        walletPaymentDetails.paymobApiKey,
        walletPaymentDetails.walletIntegrationId,
        walletPaymentDetails.iframeId,
        walletPaymentDetails.mobileNumber
      );
      console.log("Wallet payment process started successfully.");
    } catch (error) {
      console.error("Error starting wallet payment process:", error);
    }
  };

  return (
    <div>
      <h1>Wallet Payment Example</h1>
      <button onClick={handleWalletPayment}>Start Wallet Payment</button>
    </div>
  );
}

export default WalletPaymentExample;
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
