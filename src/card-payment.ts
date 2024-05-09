import {
  getAuthToken,
  createOrder,
  getFinalToken,
} from "@/utils/payment-utils";
import { Address } from "@/types";

export const startCardProcess = async ({
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
  iframeId,
  address,
}: {
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
}): Promise<void> => {
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
        address, // Pass the address object directly
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
          address, // Pass the address object directly
        });

        if (finalToken) {
          cardPayment(iframeId, finalToken);
        }
      }
    }
  } catch (error) {
    console.error("Error starting card payment process:", error);
    throw error;
  }
};

export const cardPayment = async (
  iframeId: string,
  finalToken: string
): Promise<void> => {
  try {
    const iframeURL = `https://accept.paymob.com/api/acceptance/iframes/${iframeId}?payment_token=${finalToken}`;
    window.location.href = iframeURL;
  } catch (error) {
    console.error("Error redirecting to card payment:", error);
    throw error;
  }
};
