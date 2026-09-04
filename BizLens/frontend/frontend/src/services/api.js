const apiRequest = async (path, options = {}) => {
	const response = await fetch(`/api${path}`, {
		headers: {
			"Content-Type": "application/json",
			...(options.headers || {}),
		},
		...options,
	});

	const data = await response.json().catch(() => ({}));

	if (!response.ok) {
		throw new Error(data.message || "The request failed.");
	}

	return data;
};

export default apiRequest;
