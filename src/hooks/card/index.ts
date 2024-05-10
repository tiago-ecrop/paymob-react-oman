// STEP ONE
export const startCardProcess = async (
	amount: number,
	currency: string,
	courseTitle: string,
	courseDescription: string,
	firstName: string,
	lastName: string,
	email: string,
	phoneNumber: string,
	userId: number,
	courseId: number,
	paymobApiKey: string,
	cardIntegrationId: number,
	iframeId: number,
): Promise<void> => {
	try {
		let data = {
			api_key: paymobApiKey,
		};

		let request = await fetch("https://oman.paymob.com/api/auth/tokens", {
			method: "POST",
			headers: {"Content-Type": "application/json"},
			body: JSON.stringify(data),
		});

		let response = await request.json();

		let token = response.token;

		if (token) {
			await secondStep({
				token,
				amount,
				currency,
				courseTitle,
				courseDescription,
				firstName,
				lastName,
				email,
				phoneNumber,
				userId,
				courseId,
				cardIntegrationId,
				iframeId,
			});
		}
	} catch (error) {
		console.error("Error in startCardProcess:", error);
	}
};

// STEP TWO
export const secondStep = async ({
	token,
	amount,
	currency,
	courseTitle,
	courseDescription,
	firstName,
	lastName,
	email,
	phoneNumber,
	userId,
	courseId,
	cardIntegrationId,
	iframeId,
}: {
	token: string;
	amount: number;
	currency: string;
	courseTitle: string;
	courseDescription: string;
	firstName: string;
	lastName: string;
	email: string;
	phoneNumber: string;
	userId: number;
	courseId: number;
	cardIntegrationId: number;
	iframeId: number;
}): Promise<void> => {
	try {
		let data = {
			auth_token: token,
			delivery_needed: "false",
			amount_cents: (amount * 100).toString(),
			currency,
			items: [
				{
					name: courseTitle,
					amount_cents: (amount * 100).toString(),
					description: `Ends at ${courseDescription}`,
					quantity: "1",
				},
			],
			shipping_data: {
				first_name: firstName,
				last_name: lastName,
				email,
				phone_number: phoneNumber,
				extra_description: userId.toString(),
				building: courseId,
				city: courseDescription,
				floor: courseTitle.toString(),
				postal_code: "",
			},
		};

		let request = await fetch("https://oman.paymob.com/api/ecommerce/orders", {
			method: "POST",
			headers: {"Content-Type": "application/json"},
			body: JSON.stringify(data),
		});

		let response = await request.json();

		let id = response?.id;

		if (id) {
			await thirdStep(token, id, amount, firstName, lastName, email, phoneNumber, currency, cardIntegrationId, iframeId);
		}
	} catch (error) {
		console.error("Error in secondStep:", error);
	}
};

// STEP THREE
export const thirdStep = async (
	token: string,
	id: number,
	amount: number,
	firstName: string,
	lastName: string,
	email: string,
	phoneNumber: string,
	currency: string,
	cardIntegrationId: number,
	iframeId: number,
): Promise<void> => {
	try {
		let data = {
			auth_token: token,
			amount_cents: (amount * 100).toString(),
			expiration: 3600,
			order_id: id,
			billing_data: {
				first_name: firstName,
				last_name: lastName,
				email,
				phone_number: phoneNumber,
				apartment: "803",
				floor: "42",
				street: "Ethan Land",
				building: "8028",
				shipping_method: "PKG",
				postal_code: "01898",
				city: "Jaskolskiburgh",
				country: "CR",
				state: "Utah",
			},
			currency,
			integration_id: cardIntegrationId,
		};

		let request = await fetch("https://oman.paymob.com/api/acceptance/payment_keys", {
			method: "POST",
			headers: {"Content-Type": "application/json"},
			body: JSON.stringify(data),
		});

		let response = await request.json();

		let finalToken = response.token;

		if (finalToken) {
			await cardPayment(iframeId, finalToken);
		}
	} catch (error) {
		console.error("Error in thirdStep:", error);
	}
};

// CARD PAYMENT
export const cardPayment = async (iframeId: number, finalToken: string): Promise<void> => {
	try {
		let iframeURL = `https://oman.paymob.com/api/acceptance/iframes/${iframeId}?payment_token=${finalToken}`;
		// Redirect to the Paymob payment iframe URL
		location.href = iframeURL;
	} catch (error) {
		console.error("Error in cardPayment:", error);
	}
};
