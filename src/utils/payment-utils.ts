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
  email,
  phoneNumber,
  extraDescription,
  address,
}: {
  token: string;
  amount: number;
  currency: string;
  name: string;
  description: string;
  quantity: string;
  email: string;
  phoneNumber: string;
  extraDescription: string;
  address: Address;
}): Promise<string> => {
  try {
    const data = {
      auth_token: token,
      delivery_needed: "false",
      amount_cents: (amount * 100).toString(),
      currency: currency,
      merchant_order_id: Math.random().toString(36).substring(7),
      items: [
        {
          name: name,
          amount_cents: (amount * 100).toString(),
          description: description,
          quantity: quantity,
        },
      ],
      shipping_data: {
        ...address,
        email: email,
        phone_number: phoneNumber,
        extra_description: extraDescription,
      },
      shipping_details: {
        notes: "test",
        number_of_packages: 1,
        weight: 1,
        weight_unit: "Kilogram",
        length: 1,
        width: 1,
        height: 1,
        contents: "product of some sorts",
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
  email,
  phoneNumber,
  cardIntegrationId,
  address,
  city,
}: {
  token: string;
  orderId: string;
  amount: number;
  currency: string;
  email: string;
  phoneNumber: string;
  cardIntegrationId: string;
  address: Address;
  city: string;
}): Promise<string> => {
  try {
    const data = {
      auth_token: token,
      amount_cents: (amount * 100).toString(),
      expiration: 3600,
      order_id: orderId,
      billing_data: {
        ...address,
        email: email,
        phone_number: phoneNumber,
        shipping_method: "PKG", // Assuming this is a default value
        city: city, // Add city to billing_data
      },
      currency: currency,
      integration_id: cardIntegrationId,
      lock_order_when_paid: "false", // This property indicates whether to lock the order when paid
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
