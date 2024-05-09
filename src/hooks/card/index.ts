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
  email, // Include email in function parameters
  phoneNumber, // Include phoneNumber in function parameters
  address,
  paymobApiKey,
  cardIntegrationId,
  iframeId,
  city,
}: {
  amount: number;
  currency: string;
  name: string;
  description: string;
  quantity: string;
  email: string; // Define type for email
  phoneNumber: string; // Define type for phoneNumber
  address: Address;
  paymobApiKey: string;
  cardIntegrationId: string;
  iframeId: string;
  city: string;
}): Promise<void> => {
  try {
    const token = await getAuthToken(paymobApiKey);
    const orderId = await createOrder({
      token,
      amount,
      currency,
      name,
      description,
      quantity,
      email, // Pass email to createOrder
      phoneNumber, // Pass phoneNumber to createOrder
      address,
    });

    const finalToken = await getFinalToken({
      token,
      orderId,
      amount,
      currency,
      email,
      phoneNumber,
      cardIntegrationId,
      address,
      city,
    });

    cardPayment(iframeId, finalToken);
  } catch (error) {
    console.error("Error starting card payment process:", error);
    throw new Error("Failed to start card payment process");
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
    throw new Error("Failed to redirect to card payment");
  }
};
