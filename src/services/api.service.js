export async function call({ uri, method = 'GET', body }) {
  const headers = {
    'Content-Type': 'application/json',
  };

  try {
    const response = await fetch(`http://localhost:3333/api/${uri}`, {
      method,
      headers,
      body: body ? JSON.stringify(body) : undefined,
    });

    if (!response.ok) {
      const errorData = await response.json();
      return Promise.reject(new Error(errorData.message || 'Error en la solicitud'));
    }

    return response.json();
  } catch (error) {
    // Manejar el error de manera silenciosa
    return Promise.reject(error);
  }
}