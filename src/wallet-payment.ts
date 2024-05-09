// startWalletProcess.ts
import {
  getAuthToken,
  createOrder,
  getFinalToken,
} from "@/utils/payment-utils";
import { Address } from "@/types";

export const walletPayment = async (
  // iframeId: string,
  finalToken: string,
  mobileNumber: string
): Promise<void> => {
  try {
    const response = await fetch(
      "https://accept.paymob.com/api/acceptance/payments/pay",
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          source: {
            identifier: mobileNumber,
            subtype: "WALLET",
          },
          payment_token: finalToken,
        }),
      }
    );

    const responseData = await response.json();

    if (responseData.redirect_url) {
      window.location.href = responseData.redirect_url;
    }
  } catch (error) {
    console.error("Error redirecting to wallet payment:", error);
    throw error;
  }
};

interface WalletProcessArgs {
  amount: number;
  currency: string;
  name: string;
  description: string;
  quantity: string;
  firstName: string;
  lastName: string;
  email: string;
  phoneNumber: string;
  extraDescription: string;
  city: string;
  floor: string;
  building: string;
  postalCode: string;
  paymobApiKey: string;
  cardIntegrationId: string;
  iframeId: string;
  address: Address;
  mobileNumber: string;
}

export const startWalletProcess = async ({
  amount,
  currency,
  name,
  description,
  quantity,
  firstName,
  lastName,
  email,
  phoneNumber,
  extraDescription,
  city,
  floor,
  building,
  postalCode,
  paymobApiKey,
  cardIntegrationId,
  // iframeId,
  address,
  mobileNumber,
}: WalletProcessArgs): Promise<void> => {
  try {
    const token = await getAuthToken(paymobApiKey);

    if (token) {
      const orderId = await createOrder({
        token,
        amount,
        currency,
        name,
        description,
        quantity,
        firstName,
        lastName,
        email,
        phoneNumber,
        extraDescription,
        city,
        floor,
        building,
        postalCode,
        address,
      });

      if (orderId) {
        const finalToken = await getFinalToken({
          token,
          orderId,
          amount,
          currency,
          firstName,
          lastName,
          email,
          phoneNumber,
          cardIntegrationId,
          address,
        });

        if (finalToken) {
          // await walletPayment(iframeId, finalToken, mobileNumber);
          await walletPayment(finalToken, mobileNumber);
        }
      }
    }
  } catch (error) {
    console.error("Error starting wallet payment process:", error);
    throw error;
  }
};
