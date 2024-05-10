import {Address} from "@/types";

export const getAuthToken = async (paymobApiKey: string): Promise<string> => {
	try {
		const response = await fetch("https://oman.paymob.com/api/auth/tokens", {
			method: "POST",
			headers: {"Content-Type": "application/json"},
			body: JSON.stringify({api_key: paymobApiKey}),
		});

		const data = await response.json();
		return data.token;
	} catch (error) {
		console.error("Error getting auth token:", error);
		throw new Error("Failed to obtain authentication token");
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
	address: Address;
}): Promise<number> => {
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
				// Correct structure for shipping_data
				...address,
				email: email,
				phone_number: phoneNumber,
			},
		};

		const response = await fetch("https://oman.paymob.com/api/ecommerce/orders", {
			method: "POST",
			headers: {"Content-Type": "application/json"},
			body: JSON.stringify(data),
		});

		const responseData = await response.json();
		return responseData.id;
	} catch (error) {
		console.error("Error creating order:", error);
		throw new Error("Failed to create order");
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
	orderId: number;
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
			order_id: orderId.toString(),
			billing_data: {
				// Correct structure for billing_data
				...address,
				email: email,
				phone_number: phoneNumber,
				shipping_method: "PKG",
				city: city,
				country: "CR", // Assuming this is required, as per the API example
				state: "Utah", // Assuming this is required, as per the API example
			},
			currency: currency,
			integration_id: cardIntegrationId,
			lock_order_when_paid: "false",
		};

		const response = await fetch("https://oman.paymob.com/api/acceptance/payment_keys", {
			method: "POST",
			headers: {"Content-Type": "application/json"},
			body: JSON.stringify(data),
		});

		const responseData = await response.json();
		return responseData.token;
	} catch (error) {
		console.error("Error getting final token:", error);
		throw new Error("Failed to obtain final token");
	}
};
