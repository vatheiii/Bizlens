import apiRequest from "./api.js";

export const register = (user) =>
	apiRequest("/auth/register", {
		method: "POST",
		body: JSON.stringify(user),
	});

export const login = (credentials) =>
	apiRequest("/auth/login", {
		method: "POST",
		body: JSON.stringify(credentials),
	});
