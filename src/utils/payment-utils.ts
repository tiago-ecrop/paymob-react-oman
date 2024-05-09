import { Address } from "@/types";

export const getAuthToken = async (paymobApiKey: string): Promise<string> => {
  try {
    const response = await fetch("https://accept.paymob.com/api/auth/tokens", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ api_key: paymobApiKey }),
    });

    const data = await response.json();
    return data.token;
  } catch (error) {
    console.error("Error getting auth token:", error);
    throw error;
  }
};

export const createOrder = async ({
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
}: {
  token: string;
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
  address: Address;
}): Promise<string> => {
  try {
    const data = {
      auth_token: token,
      delivery_needed: "false",
      amount_cents: (amount * 100).toString(),
      currency: currency,
      items: [
        {
          name: name,
          amount_cents: (amount * 100).toString(),
          description: description,
          quantity: quantity,
        },
      ],
      shipping_data: {
        first_name: firstName,
        last_name: lastName,
        email: email,
        phone_number: phoneNumber,
        extra_description: extraDescription,
        building: building,
        city: city,
        floor: floor,
        postal_code: postalCode,
        address: address,
      },
    };

    const response = await fetch(
      "https://accept.paymob.com/api/ecommerce/orders",
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      }
    );

    const responseData = await response.json();
    return responseData.id;
  } catch (error) {
    console.error("Error creating order:", error);
    throw error;
  }
};

export const getFinalToken = async ({
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
}: {
  token: string;
  orderId: string;
  amount: number;
  currency: string;
  firstName: string;
  lastName: string;
  email: string;
  phoneNumber: string;
  cardIntegrationId: string;
  address: Address;
}): Promise<string> => {
  try {
    const data = {
      auth_token: token,
      amount_cents: (amount * 100).toString(),
      expiration: 3600,
      order_id: orderId,
      billing_data: {
        first_name: firstName,
        last_name: lastName,
        email: email,
        phone_number: phoneNumber,
        address: address,
      },
      currency: currency,
      integration_id: cardIntegrationId,
    };

    const response = await fetch(
      "https://accept.paymob.com/api/acceptance/payment_keys",
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      }
    );

    const responseData = await response.json();
    return responseData.token;
  } catch (error) {
    console.error("Error getting final token:", error);
    throw error;
  }
};
