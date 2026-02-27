const API_BASE_URL = "http://localhost:4000/api/tasks";

const parseResponse = async (response) => {
	const payload = await response.json();

	if (!response.ok) {
		throw new Error(payload?.message || "Request failed");
	}

	return payload;
};

export const getTasks = async () => {
	const response = await fetch(API_BASE_URL);
	return parseResponse(response);
};

export const createTask = async (taskData) => {
	const response = await fetch(API_BASE_URL, {
		method: "POST",
		headers: { "Content-Type": "application/json" },
		body: JSON.stringify(taskData),
	});

	return parseResponse(response);
};

export const updateTask = async (taskId, taskData) => {
	const response = await fetch(`${API_BASE_URL}/${taskId}`, {
		method: "PUT",
		headers: { "Content-Type": "application/json" },
		body: JSON.stringify(taskData),
	});

	return parseResponse(response);
};

export const deleteTask = async (taskId) => {
	const response = await fetch(`${API_BASE_URL}/${taskId}`, {
		method: "DELETE",
	});

	return parseResponse(response);
};

export const toggleTask = async (taskId) => {
	const response = await fetch(`${API_BASE_URL}/${taskId}/toggle`, {
		method: "PATCH",
	});

	return parseResponse(response);
};
